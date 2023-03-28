const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');

const dotenv = require('dotenv');
const { sendEmailLink,  resetPassword,setNewPassword } = require('../controller/forgotPasswordController');
dotenv.config()

router.post('/forgot-password', sendEmailLink);
router.post('/forgot-password/:id/:token',setNewPassword );
router.post('/reset/password', authUser, resetPassword);
module.exports = router