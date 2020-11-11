const contestsRouter = require('express').Router();
const controller = require('../controllers/contestController');
const basicMiddleware = require('../middlewares/basicMiddlewares');

contestsRouter.get('/user/:userId', controller.getCustomersContests);
contestsRouter.get('/user/:userId/active', basicMiddleware.onlyForCreative,
  controller.getContests);

contestsRouter.get('/industries', controller.getIndustriesForContest);

module.exports = contestsRouter;
