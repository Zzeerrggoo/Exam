const createHttpError = require('http-errors');
const {
  sequelize,
  User,
  Offer,
  Rating, z,
} = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const CONSTANTS = require('../constants');

module.exports.getOffersForContest = async (req, res, next) => {
  try {
    const userid = !req?.tokenPayload?.userId ? '2' : req?.tokenPayload?.userId;

    const offers = await Offer.findAll({

      where: { contestId: req.params.contestId },
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['role', 'balance', 'password'],
          },
        },
        {
          model: Rating,
          required: false,
          where: { userId: userid },
          attributes: { exclude: ['userId', 'offerId'] },
        },
      ],
    });

    offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });

    res.status(200).send({ data: offers });
  } catch (error) {
    next(createHttpError(500, 'Server Error'));
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenPayload.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller.getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const user = { ...req.tokenPayload, id: req.tokenPayload.userId };
    res.send({ ...result, User: user });
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  controller.getNotificationController().emitChangeOfferStatus(
    creatorId,
    'Someone of yours offers was rejected',
    contestId,
  );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
  CONSTANTS.CONTEST_STATUS_FINISHED
}'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
  CONSTANTS.CONTEST_STATUS_ACTIVE
}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction,
  );
  await userQueries.updateUser(
    { balance: sequelize.literal(`balance + ${finishedContest.prize}`) },
    creatorId,
    transaction,
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction,
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED
        && creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller.getNotificationController().emitChangeOfferStatus(
    arrayRoomsId,
    'Someone of yours offers was rejected',
    contestId,
  );
  controller.getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId,
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};
