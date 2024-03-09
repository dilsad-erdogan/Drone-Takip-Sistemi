const express = require('express')

const {
    add,
    allActiveFlight,
    getFromMongo,
    totalFlight,
    flightByUserId,
    updateCoordinates
} = require("../controllers/flightController");

const router = express.Router()

router.route('/add').post(add)
router.route('/flight/all').get(allActiveFlight)
router.route('/mongo').get(getFromMongo)
router.route('/total').get(totalFlight)
router.route('/:id').get(flightByUserId)
router.route('/flight/:flightId/coordinates').put(updateCoordinates)

module.exports = router