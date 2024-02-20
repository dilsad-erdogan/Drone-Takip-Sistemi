const mongoose = require('mongoose')

const connectDB  = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully connected to database")
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB 