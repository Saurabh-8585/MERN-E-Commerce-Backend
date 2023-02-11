const express = require('express');
const router = express.Router();
const Review = require('../models/Review')
const authUser = require('../middleware/authUser')

router.get('/fetchreview/:id', async (req, res) => {
    try {
        const reviewData = await Review.find({ productId: req.params.id }).populate("user", "name").sort({ createdAt: -1 })
        res.send(reviewData)
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})
router.post('/addreview', authUser, async (req, res) => {
    try {
        const { _id, comment, rating } = req.body
        const user = req.header
        const findReview = await Review.findOne({ $and: [{ user: req.user.id }, { productId: _id }] })
        if (findReview) {
            return res.status(400).json({ msg: "Already reviewed that product " })
        }
        else {
            const reviewData = new Review({ user: req.user.id, productId: _id, comment: comment, rating: rating })
            const savedReview = await reviewData.save()
            res.send({ msg: "Review added successfully" })
        }
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})
// router.delete('/deletereview/:id',au)
module.exports = router