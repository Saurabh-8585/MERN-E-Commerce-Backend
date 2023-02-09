const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist')
const Product = require('../models/Product')
const authUser = require('../middleware/authUser')


router.get('/fetchwishlist', authUser, async (req, res) => {
    try {
        const wishlistData = await Wishlist.find({ user: req.user.id }).populate("productId")
        res.send(wishlistData)
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
})
router.post('/addwishlist', authUser, async (req, res) => {

    try {
        const { _id } = req.body
        const user = req.header
        const findProduct = await Wishlist.findOne({ productId: _id })
        if (findProduct) {
            return res.status(400).json({ msg: "Product already in a wishlist" })
        }
        else {
            const wishlistData = new Wishlist({ user: req.user.id, productId: _id })
            const savedWishlist = await wishlistData.save()
            res.send(savedWishlist)
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})
router.delete('/deletewishlist/:id', authUser, async (req, res) => {

    try {
        const result = await Wishlist.deleteOne({ productId: req.params.id })
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }



})
module.exports = router