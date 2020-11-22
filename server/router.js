const express = require('express');
const basicMiddlewares = require('./middlewares/basicMiddlewares');
const userController = require('./controllers/userController');
const contestController = require('./controllers/contestController');
const chatController = require('./controllers/chatController');
const upload = require('./utils/fileUpload');
const authRouter = require('./routes/auth');
const contestsRouter = require('./routes/contests');
const singleContestRouter = require('./routes/singleContest');
const paymentRouter = require('./routes/payment');
const offersRouter = require('./routes/offers');
const checkAuthorization = require('./middlewares/checkAuthorization');

const router = express.Router();

router.use('/auth', authRouter);

router.use(checkAuthorization);

router.use('/contests', contestsRouter);

router.use('/singleContest', singleContestRouter);

router.use('/payment', paymentRouter);

router.use('/offers', offersRouter);

router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.post('/newMessage', chatController.addMessage);

router.post('/getChat', chatController.getChat);

router.post('/getPreview', chatController.getPreview);

router.post('/blackList', chatController.blackList);

router.post('/favorite', chatController.favoriteChat);

router.post('/createCatalog', chatController.createCatalog);

router.post('/updateNameCatalog', chatController.updateNameCatalog);

router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

router.post(
  '/deleteCatalog',
  chatController.deleteCatalog,
);

router.post('/getCatalogs', chatController.getCatalogs);

module.exports = router;
