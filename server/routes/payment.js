const paymentRouter = require('express').Router();
const controller = require('../controllers/paymentController');
const { onlyForCustomer, onlyForCreative, parseBody } = require(
  '../middlewares/basicMiddlewares',
);
const validateBody = require('../middlewares/validateBody');
const { contestSchema } = require('../validation/schemas');
const { uploadContestFiles } = require('../utils/fileUpload');

paymentRouter.patch('/cashout', onlyForCreative,
  controller.cashout);

paymentRouter.patch(
  '/pay',
  onlyForCustomer,
  uploadContestFiles,
  parseBody,
  validateBody(contestSchema),
  controller.payment,
);

module.exports = paymentRouter;
