const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require('../models/User.js')
dotenv.config()

const checkAdmin = async (req, res, next) => {
    // get the user from the jwt token and id to req objectPosition: 
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send("Access denied")
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user
        const checkAdmin = await User.findById(req.user.id)
        if (checkAdmin.isAdmin == true) {
            next()
        }
        else {
            res.status(401).send("Access denied")
        }
    } catch (error) {
        res.status(401).send("Access denied")

    }


}

module.exports = checkAdmin