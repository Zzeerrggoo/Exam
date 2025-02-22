const cors = require('cors');
const express = require('express');
const path = require('path');
const router = require('./router');
const errorHandlers = require('./handlerError/handler');
const logger = require('./middlewares/logger');

function createApp() {
  const app = express();

  app.use(cors());
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use('/api', router);

  app.use(
    logger.loggerJSON,
    errorHandlers.yupErrorHandler,
    errorHandlers.sequelizeErrorHandler,
    errorHandlers.httpErrorHandler,
    errorHandlers.errorHandler,
  );
  return app;
}

exports.createApp = createApp;

exports.app = createApp();
