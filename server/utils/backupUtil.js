const {format, getTime} = require('date-fns');
const fs = require('fs');
const util = require('util');
const _ = require('lodash');

const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);
const clear = util.promisify(fs.truncate);

class BackupUtil {
  constructor(file) {
    this.file = file;
    this.timeoutId = setTimeout(this.checkData, 1000);
  }

  makeBackup = async () => {
    try {
      const buff = await read(this.file);
      const isBufferEmpty = Buffer.byteLength(buff) === 0;
      if (!isBufferEmpty) {
        const errorsList = JSON.parse(buff);
        const preparedErrorList = errorsList.map(
            (error) => _.pick(error, ['message', 'code', 'time']),
        );

        const fileName = `./logBackup/${getTime(new Date())}.json`;
        const serializedRecords = JSON.stringify(preparedErrorList);
        await write(fileName, serializedRecords);
        await clear(this.file);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  checkData = async () => {
    clearTimeout(this.timeoutId);
    const currentTime = format(new Date(), 'HH:mm:ss');
    if (currentTime === '13:00:00') {
      await this.makeBackup();
    }
    this.timeoutId = setTimeout(this.checkData, 1000);
  };
}

module.exports.backup = (file) => new BackupUtil(file);

