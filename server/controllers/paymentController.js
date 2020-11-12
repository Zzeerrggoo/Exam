const moment = require('moment');
const uuid = require('uuid/v1');
const CONSTANTS = require('../constants');
const {
  sequelize,
  Contest,
  Sequelize,
  CreditCard,
} = require('../models');

const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');

module.exports.payment = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      body: {
        cvc, expiry, price, number,
      },
    } = req;
    const squadhelpCreditCardNumber = CONSTANTS.SQUADHELP_BANK_NUMBER;

    const clientCreditCard = await CreditCard.findOne({
      where: {
        cardNumber: number.replace(/ /g, ''),
        expiry,
        cvc,
      },
      transaction,
    });

    const squadhelpCreditCard = await CreditCard.findOne({
      where: {
        cardNumber: squadhelpCreditCardNumber,
      },
      transaction,
    });

    await clientCreditCard.update(
      {
        balance: Sequelize.literal(`"CreditCards"."balance" - ${price}`),
      },
      { transaction },
    );

    await squadhelpCreditCard.update(
      {
        balance: Sequelize.literal(`"CreditCards"."balance" + ${price}`),
      },
      { transaction },
    );

    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize = index === req.body.contests.length - 1
        ? Math.ceil(req.body.price / req.body.contests.length)
        : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenPayload.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await Contest.bulkCreate(req.body.contests, transaction);
    await transaction.commit();
    res.send();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: sequelize.literal(`balance - ${req.body.sum}`) },
      req.tokenPayload.userId,
      transaction,
    );

    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`CASE 
                                    WHEN "cardNumber"='${req.body.number.replace(
    / /g, '',
  )}' 
                                    AND "expiry"='${req.body.expiry}' AND "cvc"='${req.body.cvc}'
                                    THEN "balance"+${req.body.sum}
                                    WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' 
                                    AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}' 
                                    AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
                                    THEN "balance"-${req.body.sum}
                                    END`),
      },
      {
        cardNumber: {
          [Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction,
    );

    transaction.commit();

    const data = updatedUser.balance;
    res.status(200).send({ data });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
