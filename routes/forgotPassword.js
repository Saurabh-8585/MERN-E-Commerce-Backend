const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config()

router.post('/user/forgot-password')