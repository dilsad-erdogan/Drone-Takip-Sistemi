const express = require('express');

const {
    getAll,
    getActiveAll,
    getDroneById,
    add,
    update,
    deleteDrone,
    getTotalDroneCount,
} = require('../controllers/droneController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll);
router.route('/total').get(getTotalDroneCount);
router.route('/:id').get(getDroneById);
router.route('/add').post(add);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteDrone);

//bi kişinin tüm dronelarını getir
//droneu sil

module.exports = router;