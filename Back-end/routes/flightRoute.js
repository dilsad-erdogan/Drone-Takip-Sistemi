const express = require('express')

const {
    add,
    allActiveFlight,
    getFromMongo,
    totalFlight,
    totalFlightByUserId,
    weeklyFlight,
    flightByUserId,
    updateCoordinates,
    endFlight
} = require("../controllers/flightController");

const router = express.Router()

router.route('/add').post(add)
router.route('/flight/all').get(allActiveFlight)
router.route('/mongo').get(getFromMongo)
router.route('/total').get(totalFlight)
router.route('/total/:id').get(totalFlightByUserId)
router.route('/weeklyFlight').get(weeklyFlight)
router.route('/:id').get(flightByUserId)
router.route('/flight/:flightId/coordinates').put(updateCoordinates)
router.route('/end/:id').patch(endFlight)

module.exports = router