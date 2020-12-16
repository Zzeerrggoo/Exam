const paymentRouter = require('express').Router();
const controller = require('../controllers/paymentController');
const { onlyForCustomer, onlyForCreative, parseBody } = require(
  '../middlewares/basicMiddlewares',
);
const { uploadContestFiles } = require('../utils/fileUpload');

paymentRouter.patch('/cashout', onlyForCreative,
  controller.cashout);

paymentRouter.patch(
  '/pay',
  onlyForCustomer,
  uploadContestFiles,
  parseBody,
  controller.payment,
);

module.exports = paymentRouter;
