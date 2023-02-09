const express = require('express');
const router = express.Router();
const Review = require('../models/Review')
const authUser = require('../middleware/authUser')

router.get('/fetchreview', async (req, res) => {
    try {
        const reviewData = await Review.find()
        res.send(reviewData)
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})
router.get('/addreview', authUser, async (req, res) => {
    try {
        const { comment, _id } = req.body
        const user = req.header
        const reviewData = await Review.find()
        res.send(reviewData)
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})