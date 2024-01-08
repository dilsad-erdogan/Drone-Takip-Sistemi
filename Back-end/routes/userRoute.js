const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');

const {
    getAllUser,
    getActiveAllUser,
    getUserById,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getTotalUserCount,
} = require('../controllers/userController');

const router = express.Router();

router.route('/users').get(getAllUser);
router.route('/users/activeAll').get(getActiveAllUser);
router.route('/users/total').get(getTotalUserCount);
router.route('/:id').get(getUserById);
router.route('/users/:id/delete').patch(deleteUser);

router.route('/profile/me').get(isAuthenticatedUser, getUserProfile);
router.route('/profile/update/:id').put(updateUserProfile);

module.exports = router;
