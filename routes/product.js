const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
router.get('/fetchproduct', async (req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})
router.get('/fetchproduct/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})
router.post('/fetchproduct/type', async (req, res) => {
    const { userType } = req.body
    try {
        const product = await Product.find({ type: userType })
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})
router.post('/fetchproduct/category', async (req, res) => {
    const { userType, userCategory } = req.body
    try {
        const product = await Product.find({ type: userType, category: userCategory })
        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

module.exports = router