const express = require('express');

const {
    getAll,
    getActiveAll,
    getModelById,
    add,
    update,
    deleteModel
} = require('../controllers/droneModelController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll)
router.route('/:id').get(getModelById);
router.route('/add').post(add);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteModel);

module.exports = router;