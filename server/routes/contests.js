const contestsRouter = require('express').Router();
const contestsController = require('../controllers/contestController');

contestsRouter.route('/user/:userId').
    post(contestsController.getCustomersContests);

module.exports = contestsRouter;
