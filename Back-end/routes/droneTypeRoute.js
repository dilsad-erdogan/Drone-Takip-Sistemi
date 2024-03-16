const express = require('express');

const {
    getAll,
    getActiveAll,
    getTypeById,
    add,
    update,
    deleteType
} = require('../controllers/droneTypeController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll)
router.route('/:id').get(getTypeById);
router.route('/add').post(add);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteType);

module.exports = router;