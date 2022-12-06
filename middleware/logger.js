const winston = require('winston')
require('winston-mongodb')

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
    exceptionHandlers: [
        new winston.transports.MongoDB({ db: 'mongodb://localhost/MyTrainer', level: 'error' }),
        new winston.transports.File({ filename: 'error.log' }),

    ]
})



module.exports = logger