const winston = require('winston');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logsDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Create a Winston logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDirectory, 'app1.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: 'debug',
    }),
  ],
});

logger.stream = {
  write: function (message) {
    logger.info(message.trim());
  },
};

module.exports = logger;
