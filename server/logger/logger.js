const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const path = require('path');

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const infoFilter = format((info, opts) => {
    return info.level !== 'error' ? info : false;
});

const infoLogPath = path.join('.', 'logs', 'info.log');
const errorLogPath = path.join('.', 'logs', 'errors.log');

const logger = createLogger({
    level: 'info',

    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),

    transports: [
        // Log to console
        new transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            )
        }),

        // Log info and warn (without error) to file ('info.log')
        new transports.File({
            filename: infoLogPath,
            format: combine(
                infoFilter(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            )
        }),

        //Log errors to file ('error.log')
        new transports.File({
            filename: errorLogPath,
            level: 'error',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            )
        })
    ]
});

module.exports = logger;