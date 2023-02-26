const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { sendEmailLink, forgotPasswordEmail } = require('../controller/forgotPasswordController');
dotenv.config()

router.post('/user/forgot-password', sendEmailLink);
router.post('/user/forgot-password/:id/:token', forgotPasswordEmail);
module.exports = router