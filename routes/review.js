const express = require('express');
const router = express.Router();
const Review = require('../models/Review')
const authUser = require('../middleware/authUser')

router.post('/fetchreview/:id', async (req, res) => {
    const { filterType } = req.body
    try {
        if (filterType === 'all') {
            const reviewData = await Review.find({ productId: req.params.id }).populate("user", "firstName lastName")
            res.send(reviewData)
        }
        else if (filterType === 'mostrecent') {
            const reviewData = await Review.find({ productId: req.params.id }).populate("user", "firstName lastName").sort({ createdAt: -1 })
            res.send(reviewData)
        }
        else if (filterType === 'old') {
            const reviewData = await Review.find({ productId: req.params.id }).populate("user", "firstName lastName").sort({ createdAt: 1 })
            res.send(reviewData)
        }
        else if (filterType === 'positivefirst') {
            const reviewData = await Review.find({ productId: req.params.id, }).populate("user", "firstName lastName").sort({ rating: -1 })
            res.send(reviewData)
        }
        else if (filterType === 'negativefirst') {
            const reviewData = await Review.find({ productId: req.params.id }).populate("user", "firstName lastName").sort({ rating: 1 })
            res.send(reviewData)
        }
        // else {
        //     const reviewData = await Review.find({ productId: req.params.id }).populate("user", "firstName lastName")
        //     res.send(reviewData)
        // }

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
            res.send({ user: req.user.id, msg: "Review added successfully" })
        }
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})
router.delete('/deletereview/:id', authUser, async (req, res) => {
    const id = req.params.id
    const user = req.header
    console.log(id);
    try {
        let deleteReview = await Review.deleteOne({ user: req.user.id })
        console.log(deleteReview);
        res.send({ msg: "Successful" })
    } catch (error) {
        res.send({ msg: error })
    }

})
module.exports = router