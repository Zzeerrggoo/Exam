const express = require('express');
const authRouter = require('./routes/auth');
const contestsRouter = require('./routes/contests');
const singleContestRouter = require('./routes/singleContest');
const paymentRouter = require('./routes/payment');
const offersRouter = require('./routes/offers');
const chatsRouter = require('./routes/chats');
const checkAuthorization = require('./middlewares/checkAuthorization');

const router = express.Router();

router.use('/auth', authRouter);

router.use(checkAuthorization);

router.use('/contests', contestsRouter);

router.use('/singleContest', singleContestRouter);

router.use('/payment', paymentRouter);

router.use('/offers', offersRouter);

router.use('/chats', chatsRouter);

module.exports = router;
