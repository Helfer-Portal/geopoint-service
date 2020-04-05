import winston  from "winston";

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
    transports: [
        new winston.transports.Console({ format: winston.format.simple()})
    ]
});

