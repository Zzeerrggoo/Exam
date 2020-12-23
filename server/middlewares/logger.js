const fs = require('fs');
const util = require('util');
const { LOGGING_PATH } = require('../constants');

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);

const logger = (file) => async (error, req, res, next) => {
  const time = new Date().getTime();
  const record = {
    message: error.message,
    time,
    code: error.statusCode,
    stackTrace: error.stack,
  };

  const buff = await read(file);
  const isBufferEmpty = Buffer.byteLength(buff) === 0;
  const errorsList = isBufferEmpty ? [] : JSON.parse(buff);
  errorsList.push(record);
  const serializedRecords = JSON.stringify(errorsList);
  await write(file, serializedRecords);

  next();
};

module.exports.loggerJSON = logger(LOGGING_PATH);
