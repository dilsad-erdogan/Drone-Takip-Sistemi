require("dotenv").config();
const { transports, format } = require('winston');
require('winston-mongodb');
const expressWinston = require('express-winston');
const logger = require('../config/loggerConfig');

// MongoDB transportunu oluştur
const mongoTransport = new transports.MongoDB({
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

const expressWinstonLogger = expressWinston.logger({
  transports: [
      mongoTransport,  // MongoDB transportunu ekleyin
  ],
  metaField: 'express',
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  level: 'silly', // Düşük bir seviye belirleyin
  handleExceptions: true // İstisnaları loglamak için
});

module.exports = {
    expressWinstonLogger,
    logger,  // Diğer rotalarda kullanmak için logger'ı da ekleyin
};