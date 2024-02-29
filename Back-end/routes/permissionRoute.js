const express = require('express')

const {
    getAll,
    getActiveAll,
    getPermissionById,
    getPermissionByUserId,
    getTotalPermissionCount,
    add,
    update,
    deletePermission,
} = require('../controllers/permissionController')

const router = express.Router()

router.route('/all').get(getAll)
router.route('/activeAll').get(getActiveAll)
router.route('/total').get(getTotalPermissionCount)
router.route('/:id').get(getPermissionById)
router.route('/userById/:id').get(getPermissionByUserId)
router.route('/add').post(add)
router.route('/update/:id').patch(update)
router.route('/delete/:id').patch(deletePermission)

module.exports = router