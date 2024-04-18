const express = require('express');

const {
    getLogs,
} = require("../controllers/loggingController");

const router = express.Router();

router.route('/getLogs').get(getLogs);

module.exports = router;