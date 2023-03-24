const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

// to fetch all products
router.get('/fetchproduct', async (req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    }
    catch (error) {

        res.status(500).send("Something went wrong")
    }
})
// To get Single product
router.get('/fetchproduct/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.send(product)
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})
// to get products for single category
router.post('/fetchproduct/type', async (req, res) => {
    const { userType } = req.body
    try {
        const product = await Product.find({ type: userType })
        res.send(product)
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})
// to get products category wise
router.post('/fetchproduct/category', async (req, res) => {
    const { userType, userCategory } = req.body
    try {
        if (userCategory == "all") {
            const product = await Product.find({ type: userType })
            res.send(product)
        }
        else if (userCategory == "pricelowtohigh") {
            const product = await Product.find({ type: userType }).sort({ price: 1 })
            res.send(product)
        }
        else if (userCategory == "pricehightolow") {
            const product = await Product.find({ type: userType }).sort({ price: -1 })
            res.send(product)
        }
        else if (userCategory == "highrated") {
            const product = await Product.find({ type: userType }).sort({ rating: -1 })
            res.send(product)
        }
        else if (userCategory == "lowrated") {
            const product = await Product.find({ type: userType }).sort({ rating: 1 })
            res.send(product)
        }
        else {
            const product = await Product.find({ type: userType, category: userCategory })
            res.send(product)
        }
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})
// to search products

router.get('/search/:key', async (req, res) => {
    const { key } = req.params
    try {
        if (key.length > 0) {
            const product = await Product.find({
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { type: { $regex: key, $options: "i" } },
                    { brand: { $regex: key, $options: "i" } },
                    { category: { $regex: key, $options: "i" } },
                    { author: { $regex: key, $options: "i" } },
                    { description: { $regex: key, $options: "i" } },
                    { gender: { $regex: key, $options: "i" } },
                ]
            })
            if (product.length <= 0) {
                res.status(400).send("Product not found")
            }
            else {
                res.send(product)
            }
        }

    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})




module.exports = router