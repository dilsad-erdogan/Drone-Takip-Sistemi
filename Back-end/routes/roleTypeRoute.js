const express = require('express');

const {
    getAll,
    getActiveAll,
    getRoleById,
    add,
    update,
    deleteRole
} = require('../controllers/roleTypeController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll)
router.route('/:id').get(getRoleById);
router.route('/add').post(add);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteRole);

//bi kişinin tüm dronelarını getir

module.exports = router;