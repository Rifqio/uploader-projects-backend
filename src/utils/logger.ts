import * as winston from 'winston';

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
        query: 7 
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'green',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'gray',
        query: 'magenta' 
    }
};

winston.addColors(customLevels.colors);

const customTimestampFormat = winston.format((info) => {
    info.timestamp = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    return info;
})();

export const Logger = winston.createLogger({
    levels: customLevels.levels,
    level: 'query',
    format: winston.format.combine(
        customTimestampFormat,
        winston.format.colorize({ level: true }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [new winston.transports.Console()],
});
