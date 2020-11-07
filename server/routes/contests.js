const contestsRouter = require('express').Router();
const controller = require('../controllers/contestController');

contestsRouter.route('/user/:userId').get(controller.getCustomersContests);

module.exports = contestsRouter;
