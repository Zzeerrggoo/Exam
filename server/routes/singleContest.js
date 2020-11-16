const singleContestRouter = require('express').Router();
const controller = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

singleContestRouter.get('/description', controller.getDescriptionForContest);

singleContestRouter.route('/:contestId')
  .get(basicMiddlewares.canGetContest, controller.getContestDataById);

module.exports = singleContestRouter;
