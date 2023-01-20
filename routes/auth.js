const express = require('express');
const jwt = require("jsonwebtoken");
const JWT_TOKEN = require('../JWTKEY');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const authUser = require('../middleware/authUser');


// create a user :post "/auth",!auth
router.post('/register', [

    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ error: "sorry a user with this email is already exists" })
        }

        // password hashing
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_TOKEN)
        res.send({ authToken })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})


// login Route
router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {

            return res.status(400).send({ success, error: "Please try to login with correct credentials" })
        }
        const passComp = await bcrypt.compare(password, user.password)
        if (!passComp) {
            return res.status(400).send({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user._id
            }
        }

        const authToken = jwt.sign(data, JWT_TOKEN)
        success = true
        res.send({ success, authToken })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error002")
    }
}
);
// logged in user details

router.post('/getuser', authUser, async (req, res) => {

    try {
        userId = req.user
        const user = await User.findOne(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error 0001")
    }
}
)
module.exports = router