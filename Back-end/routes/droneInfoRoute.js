const express = require('express');

const {
    getAll,
    getActiveAll,
    getDroneById,
    addInfo,
    update,
    deleteDrone
} = require('../controllers/droneInfoController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll)
router.route('/:id').get(getDroneById);
router.route('/add').post(addInfo);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteDrone);

//bi kişinin tüm dronelarını getir
//droneu sil

module.exports = router;