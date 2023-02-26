const express = require('express');
const { checkout, paymentVerification } = require('../controller/paymentController');
const router = express.Router()
const Payment = require('../models/Payment')
const User = require('../models/User')
const authUser = require('../middleware/authUser')
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
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

router.post('/send-order-email', async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        },
      })
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset Request",
        html: "<h2>saurabh</h2>"
      }
      transport.sendMail(mailOptions)
    }
    
    else {
      res.send({ msg: "please send email" })
    }

  } catch (error) {
    console.log(error);
    res.send(error)
  }

})





module.exports = router