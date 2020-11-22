const offersRouter = require('express').Router();
const controller = require('../controllers/offersController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

offersRouter.get('/:contestId', controller.getOffersForContest);

offersRouter.put('/:offerId/rating', basicMiddlewares.onlyForCustomer,
  controller.changeMark);

module.exports = offersRouter;
