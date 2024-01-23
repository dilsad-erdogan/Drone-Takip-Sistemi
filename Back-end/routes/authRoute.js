var express = require('express');

const { 
    register, 
    login,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');

const { isRequestValidated, validateRegisterRequest } = require('../validators/userValidator');

const router = express.Router();

router.route('/register').post(validateRegisterRequest, isRequestValidated, register);
router.route('/login').post(login);
router.route('forgot-password').post(forgotPassword);
router.route('/reset-password/:resetToken').patch(resetPassword);
module.exports = router;