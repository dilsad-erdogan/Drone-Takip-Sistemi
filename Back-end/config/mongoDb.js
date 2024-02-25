const mongoose = require('mongoose')
const cron = require('node-cron');
const updateFlightCoordinates = require('../controllers/flightController')

const connectDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to database")

        // cron.schedule('*/5 * * * *', async () => {
        //   console.log('Running update job every 5 minutes');
        //   try {
        //     await updateFlightCoordinates();
        //   } catch (error) {
        //     console.error('Error during update job:', error);
        //     // ... hata durumunda yapılacak işlemler
        //   }
        // });
      } catch (error) {
        throw error;
      }
}

module.exports = connectDB 