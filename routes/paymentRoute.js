const express = require('express');
const { checkout, paymentVerification } = require('../controller/paymentController');
const razorPayDetails = require('../razorPayDetails');
const router = express.Router()
const Payment = require('../models/Payment')
const authUser = require('../middleware/authUser')


router.route('/checkout').post(checkout)
router.route('/paymentverification').post(paymentVerification)
router.route('/getkey').get((req, res) => res.status(200).json({ key: razorPayDetails.key }))


router.get('/getPreviousOrders',authUser, async (req, res) => {
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