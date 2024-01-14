const fs = require('fs');
const path = require('path');
const winston = require('winston');

const logsDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logFilePath = path.join(logsDirectory, 'app1.log');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: 'debug',
    }),
  ],
});

const logMiddleware = (req, res, next) => {
  let requestBody = `${JSON.stringify(req.body)}`;

  req.on('data', (chunk) => {
    requestBody += chunk;
  });

  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks = [];

  res.write = (...restArgs) => {
    chunks.push(Buffer.from(restArgs[0]));
    oldWrite.apply(res, restArgs);
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }

    const responseBody = Buffer.concat(chunks).toString('utf8');

    const logData = `[REQUEST] ${req.method} ${req.url} ${requestBody}\n` +
                    `[RESPONSE] ${res.statusCode} ${responseBody}\n`;

    // Log using Winston logger
    logger.info(logData.trim());

    // Restore the original write and end functions
    res.write = oldWrite;
    res.end = oldEnd;

    // Continue with the response
    oldEnd.apply(res, restArgs);
  };

  next();
};

module.exports = logMiddleware;
