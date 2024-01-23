const express = require('express');

const {
    getAll,
    getActiveAll,
    getBrandById,
    add,
    update,
    deleteBrand
} = require('../controllers/droneBrandController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll)
router.route('/:id').get(getBrandById);
router.route('/add').post(add);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteBrand);

module.exports = router;