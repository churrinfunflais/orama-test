// ------------------- [Modules] ----------------------- //
import expressWinston from 'express-winston';
import chalk from 'chalk';
import util from 'util';
import { createLogger, format, transports } from 'winston';

// ------------------- [Logger] ------------------------ //

const messageFormatter = format.printf((info) => {
    const { timestamp: timeString = '', sender = '', message, args = [] } = info;
    const formattedMsgWithArgs = util.formatWithOptions({ colors: true }, message, ...args);
    const msg = `${chalk.gray(timeString)} - ${info.level}: ${formattedMsgWithArgs} ${chalk.gray(sender)}${
        info?.meta && JSON.stringify(info?.meta)
    }`;
    return msg;
});

export const logger = createLogger({
    format: format.combine(format.splat(), format.timestamp({ format: 'HH:mm:ss.SSS' })),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), messageFormatter),
            level: 'debug',
        }),
    ],
});

export const expressLogger = expressWinston.logger({
    requestWhitelist: ['body', 'query', 'headers'],
    responseWhitelist: ['body', 'headers'],
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
    expressFormat: true,
    colorize: false,
});
