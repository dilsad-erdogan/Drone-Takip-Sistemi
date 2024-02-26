const express = require('express')

const {
    addFlight,
    allActiveFlight,
    getFromMongo,
    updateCoordinates
} = require("../controllers/flightController");

const router = express.Router()

router.route('/flight').post(addFlight)
router.route('/flight/all').get(allActiveFlight)
router.route('/mongo').get(getFromMongo)
router.route('/flight/:flightId/coordinates').put(updateCoordinates)

module.exports = router