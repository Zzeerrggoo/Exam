const _ = require('lodash');
const createHttpError = require('http-errors');
const {
  Sequelize,
  User,
  Offer,
  Select,
  Contest,
} = require('../models');

const contestQueries = require('./queries/contestQueries');
const UtilFunctions = require('../utils/functions');

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
          where: { isAllowed: true },
          required: false,
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

module.exports.getContestDataById = async (req, res, next) => {
  try {
    const contestData = await Contest.findOne({
      where: { id: req.params.contestId },
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['role', 'balance', 'password'],
          },
        },
      ],
    });

    const data = contestData.get({ plain: true });
    res.status(200).send({ data });
  } catch (error) {
    next(createHttpError(500, 'Server Error'));
  }
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
    res.status(200).send({ data: updatedContest });
  } catch (e) {
    next(e);
  }
};
