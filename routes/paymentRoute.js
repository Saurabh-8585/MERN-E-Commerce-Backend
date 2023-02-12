const express = require('express');
const { checkout, paymentVerification } = require('../controller/paymentController');
const razorPayDetails = require('../razorPayDetails');
const router = express.Router()


router.route('/checkout').post(checkout)
router.route('/paymentverification').post(paymentVerification)
router.route('/getkey').get((req, res) => res.status(200).json({ key: razorPayDetails.key }))




module.exports = router