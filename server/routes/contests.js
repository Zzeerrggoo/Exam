const contestsRouter = require('express').Router();
const contestsController = require('../controllers/contestController');

contestsRouter.route('/user/:userId').
    get(contestsController.getCustomersContests);

module.exports = contestsRouter;
