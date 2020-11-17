const singleContestRouter = require('express').Router();
const controller = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');

singleContestRouter.get('/description', controller.getDescriptionForContest);

singleContestRouter.route('/:contestId')
  .get(basicMiddlewares.canGetContest, controller.getContestDataById)
  .patch(upload.updateContestFile, controller.updateContest);

module.exports = singleContestRouter;
