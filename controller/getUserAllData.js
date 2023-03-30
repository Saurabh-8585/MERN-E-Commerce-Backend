const User = require("../models/User");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const Review = require("../models/Review");

const getAllUsersInfo = async (req, res) => {
    try {
        const data = await User.find().select('-password');
        // console.log(data);
        res.send(data)

    } catch (error) {
        console.log(error);
        res.status(400).send("User Not Found")
    }
}
const getSingleUserInfo = async (req, res) => {
    const { userId } = req.params;
    const findUser = await User.findById(userId)
    if (findUser) {
        try {
            const findUser = await User.findById(userId).select('-password');
            res.send(findUser);
        } catch (error) {
            res.send("Something went wrong")
        }
    }
    else {
        res.status(400).send("User Not Found")
    }

}
const getUserCart = async (req, res) => {
    const { userId } = req.params;
    const findUser = await User.findById(userId)
    if (findUser) {
        try {
            const findUserCart = await Cart.find({ user: userId })
                .populate("productId", "name price image rating type")
                .populate("user", "name email");
            res.send(findUserCart);
        } catch (error) {
            res.send("Something went wrong")
        }
    }
    else {
        res.status(400).send("User Not Found")
    }

}
const getUserWishlist = async (req, res) => {
    const { userId } = req.params;
    const findUser = await User.findById(userId)
    if (findUser) {
        try {
            const findUserWishlist = await Wishlist.find({ user: userId })
                .populate("productId", "name price image rating type")
                .populate("user", "name email");

            res.send(findUserWishlist);
        } catch (error) {
            res.send("Something went wrong")
        }
    }
    else {
        res.status(400).send("User Not Found")
    }

}
const getUserReview = async (req, res) => {
    const { userId } = req.params;
    const findUser = await User.findById(userId)
    if (findUser) {
        try {

            const findUserReview = await Review.find({ user: userId })
                .populate("productId", " price image rating type")
                .populate("user", "firstName lastName");;
            res.send(findUserReview);
        } catch (error) {
            res.send("Something went wrong")
        }
    }
    else {
        res.status(400).send("User Not Found")
    }

}

const deleteUserReview = async (req, res) => {
    const { id, userId } = req.params
    console.log(id,userId);
    try {
        let deleteReview = await Review.deleteOne({ $and: [{ user: userId }, { _id: id }] })
        console.log(deleteReview);
        res.send({ deleteReview, msg: "Review deleted successfully" })
    } catch (error) {
        res.send({ msg: "Something went wrong,Please try again letter" })
    }
}
module.exports = { getAllUsersInfo, getSingleUserInfo, getUserCart, getUserWishlist, getUserReview, deleteUserReview }