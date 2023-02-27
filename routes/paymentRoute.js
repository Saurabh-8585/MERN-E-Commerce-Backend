const express = require('express');
const { checkout, paymentVerification } = require('../controller/paymentController');
const router = express.Router()
const Payment = require('../models/Payment')
const User = require('../models/User')
const authUser = require('../middleware/authUser')
const dotenv = require('dotenv');
dotenv.config()

router.route('/checkout').post(checkout)
router.route('/paymentverification').post(paymentVerification)
router.route('/getkey').get((req, res) => res.status(200).json({ key: process.env.RAZORPAY_API_KEY }))



router.get('/getPreviousOrders', authUser, async (req, res) => {
  try {
    const data = await Payment.find({ user: req.user.id })
    res.send(data)
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal server error")
  }
})

module.exports = router