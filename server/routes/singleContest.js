const singleContestRouter = require('express').Router();
const controller = require('../controllers/contestController');

singleContestRouter.get('/description', controller.getDescriptionForContest);

module.exports = singleContestRouter;
