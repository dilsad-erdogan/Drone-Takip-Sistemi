const express = require('express');

const {
    getAll,
    getActiveAll,
    getDroneById,
    add,
    update,
    deleteDrone,
    getTotalDroneCount,
    getTotalUserDroneCount,
    allDroneAndInfo,
} = require('../controllers/droneController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll);
router.route('/total').get(getTotalDroneCount);
router.route('/:id').get(getDroneById);
router.route('/add').post(add);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteDrone);
router.route('/userdrone/:id').get(getTotalUserDroneCount);
router.route('/droneAndInfo/all').get(allDroneAndInfo);

module.exports = router;