const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
var transport = new (winston.transports.DailyRotateFile)({
    filename: path.join('logs/%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
});


const logger = winston.createLogger({
  transports: [
   transport
  ]
});


module.exports = logger;