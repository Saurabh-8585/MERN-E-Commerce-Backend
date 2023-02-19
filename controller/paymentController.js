const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Cart = require('../models/Cart');
const dotenv = require('dotenv');
dotenv.config()


let productInfo = {};
let userData = {};
let userInfo;
let totalAmount;
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});
const checkout = async (req, res) => {
    const { amount, userId, productDetails, userDetails } = req.body
    totalAmount = Number(amount)
    userInfo = userId
    productInfo = JSON.parse(productDetails)
    userData = JSON.parse(userDetails)
    const options = {
        amount: Number(amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);


    res.status(200).json({
        success: true,
        order
    });

};
// 
const paymentVerification = async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database comes here

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            user: userInfo,
            productData: productInfo,
            userData,
            totalAmount
        });



        const deleteCart = await Cart.deleteMany({ 'user': userInfo })

        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);

    } else {
        res.status(400).json({
            success: false,
        });
    }
}
module.exports = { checkout, paymentVerification }