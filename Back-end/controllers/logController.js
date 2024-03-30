require("dotenv").config();
const { transports, format } = require('winston');
require('winston-mongodb');
const expressWinston = require('express-winston');

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

// Winston middleware'i oluştur
const expressWinstonLogger = expressWinston.logger({
  transports: [
    mongoTransport,  // MongoDB transportunu ekleyin
  ],
  format: format.combine(
      format.timestamp(),
      format.json()
  ),
  metaField: 'express',
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  level: 'info', // Düşük bir seviye belirleyin
  handleExceptions: true, // İstisnaları loglamak için
});

module.exports = {
  expressWinstonLogger,
};