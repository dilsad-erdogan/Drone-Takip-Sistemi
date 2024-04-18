const Log = require("../models/Log");

async function getLogs(req, res) {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(50); 
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getLogs,
};