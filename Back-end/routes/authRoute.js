var express = require('express');

const { 
    register, 
    login 
} = require('../controllers/authController');

const { isRequestValidated, validateRegisterRequest } = require('../validators/userValidator');

const router = express.Router();

router.route('/register').post(validateRegisterRequest, isRequestValidated, register);
router.route('/login').post(login);

module.exports = router;