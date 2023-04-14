const express = require('express');
const jwt = require("jsonwebtoken");
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const authAdmin = require("../../middleware/authAdmin");
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const { getAllUsersInfo, getSingleUserInfo, getUserCart, getUserWishlist, getUserReview, deleteUserReview, deleteUserCartItem, deleteUserWishlistItem, updateProductDetails, userPaymentDetails, addProduct, deleteProduct } = require('../../controller/AdminControl');
const { chartData } = require('../../controller/AllProductInfo');
dotenv.config()


let success = false
let adminKey = process.env.ADMIN_KEY
router.get('/getusers', authAdmin, getAllUsersInfo);
router.get('/geteuser/:userId', authAdmin, getSingleUserInfo);
router.get('/getcart/:userId', authAdmin, getUserCart);
router.get('/getwishlist/:userId', authAdmin, getUserWishlist);
router.get('/getreview/:userId', authAdmin, getUserReview);
router.get('/getorder/:id', authAdmin, userPaymentDetails);
router.get('/chartdata', chartData);

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { email, password, key } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user && user.isAdmin == true && key == adminKey) {

            const passComp = await bcrypt.compare(password, user.password)
            if (!passComp) {
                return res.status(400).send({ success, error: "Please try to login with correct credentials" })
            }

            const data = {
                user: {
                    id: user._id
                }
            }

            const authToken = jwt.sign(data, process.env.JWT_SECRET)
            success = true
            res.send({ success, authToken })
        }

        else {
            return res.status(400).send({ success, error: "Invalid User" })
        }

    }
    catch (error) {
        res.status(500).send("Internal server error002")
    }
}
);
router.post('/register', [

    body('firstName', 'Enter a valid name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('phoneNumber', 'Enter a valid phone number').isLength({ min: 10, max: 10 })


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ error: errors.array() })
    }
    const { firstName, lastName, email, phoneNumber, password, key } = req.body

    try {
        let user = await User.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });
        if (user) {
            return res.status(400).send({ error: "Sorry a user already exists" })
        }

        if (key != adminKey) {
            return res.status(400).send({ error: "Invalid User" })
        }
        // password hashing
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        // create a new user
        user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: secPass,
            isAdmin: true
        })
        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        res.send({ success, authToken })
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})
router.post('/addproduct', authAdmin, addProduct);



router.put('/updateproduct/:id', authAdmin, updateProductDetails)



router.delete('/review/:id', authAdmin, deleteUserReview);
router.delete('/usercart/:id', authAdmin, deleteUserCartItem);
router.delete('/userwishlist/:id', authAdmin, deleteUserWishlistItem);
router.delete('/deleteproduct/:id', authAdmin, deleteProduct);


module.exports = router