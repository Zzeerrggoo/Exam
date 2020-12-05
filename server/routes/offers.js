const offersRouter = require('express').Router();
const controller = require('../controllers/offersController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const nodemailer = require('../middlewares/nodemailer');

offersRouter.post('/', upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer, controller.setNewOffer);

offersRouter.get('/:contestId', controller.getOffersForContest);

offersRouter.patch('/:offerId/status',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  controller.setOfferStatus);

offersRouter.put('/:offerId/rating', basicMiddlewares.onlyForCustomer,
  controller.changeMark);

offersRouter.patch('/:offerId/moderate', basicMiddlewares.onlyForModerator,
  controller.moderateOffer,
  nodemailer.sendEmail);

offersRouter.get('/moderating/offers', basicMiddlewares.onlyForModerator,
  controller.getModeratingOffers);

module.exports = offersRouter;
