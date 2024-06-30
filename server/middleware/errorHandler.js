const logger = require('../logger/logger');

const errorHandler = (err, req, res, next) => {
    const message = err?.message ?? 'Unknown server error';

    logger.error(message);
    res.status(500).json({ message });
};

module.exports = errorHandler;
