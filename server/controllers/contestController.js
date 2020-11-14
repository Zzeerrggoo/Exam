const _ = require('lodash');
const createHttpError = require('http-errors');
const {
  sequelize,
  Sequelize,
  User,
  Offer,
  Select,
  Rating,
  Contest,
} = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');

module.exports.getContests = async (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(
    req.query.typeIndex,
    req.query.contestId,
    req.query.industry,
    req.query.awardType,
    req.tokenPayload.userId,
  );

  try {
    const ownEntries = req.query.ownEntries === 'true';

    const contests = await Contest.findAll({
      where: predicates.where,
      order: predicates.order,
      limit: req.query.limit,
      offset: req.query.offset ? req.query.offset : 0,
      include: [
        {
          model: Offer,
          where: ownEntries ? { userId: req.tokenPayload.userId } : {},
          required: ownEntries,
        },
      ],
    });

    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length),
    );

    const haveMore = !(contests.length === 0);
    res.status(200).send({ data: { contests, haveMore } });
  } catch (error) {
    next(createHttpError(500, 'Server Error'));
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
    const contests = await Contest.findAll({
      where: { status: req.headers.status, userId: req.params.userId },
      limit: req.body.limit,
      offset: req.body.offset ? req.body.offset : 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: Offer,
        },
      ],
    });

    contests.forEach(
      (contest) => { contest.dataValues.count = contest.dataValues.Offers.length; },
    );

    const haveMore = !(contests.length === 0);

    res.status(200).send({ data: { contests, haveMore } });
  } catch (error) {
    next(createHttpError(500, 'Server Error'));
  }
};

module.exports.getIndustriesForContest = async (req, res, next) => {
  try {
    const industryTypes = await Select.findAll({
      where: { type: 'industry' },
    });

    if (!industryTypes) {
      res.status(404).send();
    }

    const data = industryTypes.map((item) => item?.describe);
    res.status(200).send({ data });
  } catch (err) {
    next(createHttpError(500, 'Server Error'));
  }
};

module.exports.getDescriptionForContest = async (req, res, next) => {
  const data = {};
  try {
    const whereOption = {
      type: {
        [Sequelize.Op.or]: _.compact([
          req.body.characteristic1,
          req.body.characteristic2,
        ]),
      },
    };
    const characteristics = await Select.findAll({
      where: whereOption,
    });
    if (!characteristics) {
      res.status(404).send();
      return;
    }
    characteristics.forEach((characteristic) => {
      if (!data[characteristic.type]) {
        data[characteristic.type] = [];
      }
      data[characteristic.type].push(characteristic.describe);
    });
    res.status(200).send({ data });
  } catch (err) {
    next(createHttpError(500, 'Server Error'));
  }
};

/// legacy///

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await Contest.findOne({
      where: { id: req.headers.contestid },
      order: [[Offer, 'id', 'asc']],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: Offer,
          required: false,
          where:
              req.tokenPayload.role === CONSTANTS.CREATOR
                ? { userId: req.tokenPayload.userId }
                : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: req.tokenPayload.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const { contestId } = req.body;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenPayload.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
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
