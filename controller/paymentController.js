const Razorpay = require('razorpay');
const razorpayDetails = require('../razorPayDetails');
const crypto = require('crypto');
const Payment = require('../models/Payment');

let user = '';

const instance = new Razorpay({
    key_id: razorpayDetails.key,
    key_secret: razorpayDetails.secret,
});
const checkout = async (req, res) => {

    const { amount, userId } = req.body
    user += userId
    const options = {
        amount: Number(amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order,
    });

};
// 
const paymentVerification = async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", razorpayDetails.secret)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database comes here

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            user
        });

        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);

    } else {
        res.status(400).json({
            success: false,
        });
    }
}
module.exports = { checkout, paymentVerification }