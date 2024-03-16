const express = require('express')
const router = express.Router()

const {
    getAll,
    getActiveAll,
    getPilotById,
    getTotalPilotCount,
    add,
    update,
    deletePilot,
} = require('../controllers/pilotController')

router.route('/all').get(getAll)
router.route('/activeAll').get(getActiveAll)
router.route('/total').get(getPilotById)
router.route('/:id').get(getTotalPilotCount)
router.route('/add').post(add)
router.route('/update/:id').put(update)
router.route('/delete/:id').patch(deletePilot)

module.exports = router