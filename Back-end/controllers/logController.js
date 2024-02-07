require("dotenv").config();
const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
const expressWinston = require('express-winston');
const logger = require('../config/loggerConfig');

// MongoDB transportunu oluştur
const mongoTransport = new transports.MongoDB({
    level: 'info',  // Log seviyesi, isteğe bağlı olarak değiştirilebilir
    db: process.env.MONGODB_URI,
    options: { useUnifiedTopology: true },  // MongoDB bağlantısı için gerekli seçenekler
    collection: 'logs',  // Logların kaydedileceği koleksiyon adı
    format: format.combine(
      format.json(),
      format.timestamp(),
      format.metadata(),
      format.prettyPrint()
    ),
});

// Express-Winston için logger'ı ayarla
const expressWinstonLogger = expressWinston.logger({
    transports: [
      mongoTransport,  // MongoDB transportunu ekleyin
    ],
});

module.exports = {
    expressWinstonLogger,
    logger,  // Diğer rotalarda kullanmak için logger'ı da ekleyin
};