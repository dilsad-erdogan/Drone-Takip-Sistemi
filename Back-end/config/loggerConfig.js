const { createLogger,transports,format } = require("winston");
require('winston-mongodb');
require('dotenv').config()

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
          level:'warn',
          filename:'logger/warningLogger.log'
        }),
        new transports.File({
          level:'error',
          filename:'logger/errorLogger.log'
        }),
        new transports.MongoDB({
          db: process.env.MONGODB_URI, // database URL MongoDB Atlas URI
          "collection":"TutorialLogs"
        }),
        new transports.File({
            level:'info',
            filename:'logger/infoLogger.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint(),
        format.metadata()
    )

})
module.exports = logger;