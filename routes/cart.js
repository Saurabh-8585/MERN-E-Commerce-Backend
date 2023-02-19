const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart')
const authUser = require('../middleware/authUser')

// get all cart products
router.get('/fetchcart', authUser, async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user.id }).populate("productId", "name price image rating type").populate('user', "name email")
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
        const { _id, quantity } = req.body
        const user = req.header
        const cart = new Cart({
            user: req.user.id, productId: _id, quantity
        })
        const savedCart = await cart.save()
        res.send(savedCart)
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