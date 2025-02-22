const bd = require('../models/index');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');
const { Sequelize, Contest } = require('../models');

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  for (let i = 0; i < req.body.contests.length; i++) {
    if (req.body.contests[i].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[i].fileName = file[0].filename;
      req.body.contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    if (req.tokenPayload.userRole === CONSTANTS.CUSTOMER) {
      result = await Contest.findOne({
        where: { id: req.params.contestId, userId: req.tokenPayload.userId },
      });
    } else if (req.tokenPayload.userRole === CONSTANTS.CREATOR) {
      result = await Contest.findOne({
        where: {
          id: req.params.contestId,
          status: {
            [Sequelize.Op.or]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenPayload.userRole === CONSTANTS.CUSTOMER) {
    next(new RightsError());
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenPayload.userRole === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  }
  next();
};

module.exports.onlyForModerator = (req, res, next) => {
  if (req.tokenPayload.userRole !== CONSTANTS.MODERATOR) {
    return next(new RightsError('this page only for moderator'));
  }
  next();
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenPayload.userRole === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (
      result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS_ACTIVE
    ) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await Contest.findOne({
      where: {
        userId: req.tokenPayload.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = Contest.findOne({
      where: {
        userId: req.tokenPayload.userId,
        id: req.body.contestId,
        status: { [Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};
