const offersRouter = require('express').Router();
const controller = require('../controllers/offersController');

offersRouter.get('/:contestId', controller.getOffersForContest);

module.exports = offersRouter;
