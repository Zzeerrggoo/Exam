const createHttpError = require('http-errors');
const {
  sequelize,
  User,
  Offer,
  Rating,
} = require('../models');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const CONSTANTS = require('../constants');

module.exports.getOffersForContest = async (req, res, next) => {
  try {
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
          attributes: { exclude: ['offerId', 'userId'] },
        },
      ],
    });

    res.status(200).send({ data: offers });
  } catch (error) {
    next(createHttpError(500, 'Server Error'));
  }
};

module.exports.changeMark = async (req, res, next) => {
  const {
    creatorId, offerId, mark,
  } = req.body;

  try {
    const changeMark = await Rating.update({ mark }, {
      where: {
        offerId,
        userId: creatorId,
      },
    });

    if (changeMark[0] === 0) {
      await Rating.create({
        offerId,
        mark,
        userId: creatorId,
      });
    }

    const rating = await Rating.findAll({
      where: {
        userId: creatorId,
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('mark')), 'rating'],
      ],
    });

    const { rating: preparedRating } = rating[0].get({ plain: true });
    const user = await User.update({ rating: preparedRating },
      {
        where: { id: creatorId },
        returning: true,
      });

    const userData = user[1][0].get({ plain: true });
    const data = {
      offer: { creatorId, offerId, mark },
      user: userData,
    };

    controller.getNotificationController().emitChangeMark(creatorId);

    res.status(200).send({ data });
  } catch (error) {
    next(error);
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
    controller.getNotificationController()
      .emitEntryCreated(req.body.customerId);

    const user = await User.findOne({
      where: { id: req.tokenPayload.userId },
      raw: true,
      attributes: { exclude: ['password'] },
    });

    res.send({ data: { ...result, User: user } });
  } catch (error) {
    next(error);
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

const resolveOffer = async (data) => {
  const {
    contestId,
    creatorId,
    orderId,
    offerId,
    priority,
    transaction,
  } = data;

  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: sequelize.literal(`CASE
                                 WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${CONSTANTS.CONTEST_STATUS_FINISHED}'
                                 WHEN "orderId"='${orderId}' AND "priority"=${priority
        + 1}  THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
                                 ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
                                 END`),
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
                                  END`),
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
      res.status(200).send({ data: offer });
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer({
        contestId: req.body.contestId,
        creatorId: req.body.creatorId,
        orderId: req.body.orderId,
        offerId: req.body.offerId,
        priority: req.body.priority,
        transaction,
      });
      res.status(200).send({ data: winningOffer });
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};
