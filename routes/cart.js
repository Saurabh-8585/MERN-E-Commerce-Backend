const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const authUser = require('../middleware/authUser')

// get all cart products
router.get('/fetchcart', authUser, async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user.id })
        res.send(cart)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// add to cart

router.post('/addcart', authUser, async (req, res) => {

    try {
        const { name, description, brand, price, category, image, rating, _id } = req.body
        const user = req.header
        // const product = await Cart.findOne({ productId: _id })
        // if (product) {
        //     res.status(404).send({ status: 'exists', carts })
        // }
        // else {
            const cart = new Cart({
                name, description, brand, price, image, category, rating, user: req.user.id, productId: _id
            })
            const savedCart = await cart.save()
            res.send(savedCart)
        // }
    }


    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// remove from cart
router.delete('/deletecart/:id', authUser, async (req, res) => {

    try {
        const result = await Cart.deleteOne({ productId: req.params.id })
        res.send(result)


    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }



})
module.exports = router