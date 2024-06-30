const logger = require('../logger/logger');

const requestLogger = (req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
};

module.exports = requestLogger;
