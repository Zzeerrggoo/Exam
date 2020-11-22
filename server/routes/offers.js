const offersRouter = require('express').Router();
const controller = require('../controllers/offersController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

offersRouter.post('/', upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer, controller.setNewOffer);

offersRouter.get('/:contestId', controller.getOffersForContest);

offersRouter.put('/:offerId/rating', basicMiddlewares.onlyForCustomer,
  controller.changeMark);

module.exports = offersRouter;
