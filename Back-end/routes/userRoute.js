const express = require('express');
const {isAuthenticatedUser} = require('../middleware/auth');

const {
    getAllUser,
    getActiveAllUser,
    getUserById,
    getDroneUserById,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getTotalUserCount,
    getUserByName,
} = require('../controllers/userController');

const router = express.Router();

router.route('/all').get(getAllUser);
router.route('/activeAll').get(getActiveAllUser);
router.route('/total').get(getTotalUserCount);
router.route('/:id').get(getUserById);
router.route('/name/:id').get(getUserByName);
router.route('/droneById/:id').get(getDroneUserById);
router.route('/delete/:id').patch(deleteUser);
     
router.route('/profile/me').get(isAuthenticatedUser, getUserProfile);
router.route('/profile/update/:id').put( updateUserProfile);

module.exports = router;