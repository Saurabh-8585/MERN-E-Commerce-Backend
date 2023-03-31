const User = require("../models/User");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const Review = require("../models/Review");
let success = false;
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
            const findUserWishlist = await Wishlist.find({ user: userId }).populate("productId")
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
                .populate("productId", "name price image rating type")
                .populate("user", "firstName lastName");
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
    const { id } = req.params;
    try {
        let deleteReview = await Review.findByIdAndDelete(id)
        res.send({ msg: "Review deleted successfully" })
    } catch (error) {
        res.status(400).send({ msg: "Something went wrong,Please try again letter", error })
    }
}


const deleteUserCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        let deleteCart = await Cart.deleteOne({ productId: id })
        success = true
        res.send({ success, msg: "Review deleted successfully" })
    } catch (error) {
        res.status(400).send({ msg: "Something went wrong,Please try again letter" })
    }
}
const deleteUserWishlistItem = async (req, res) => {
    const { id } = req.params;
    try {
        let deleteCart = await Wishlist.deleteOne({ productId: id })
        success = true
        res.send({ success, msg: "Review deleted successfully" })
    } catch (error) {
        res.status(400).send({ msg: "Something went wrong,Please try again letter" })
    }
}

module.exports = {
    getAllUsersInfo, getSingleUserInfo,
    getUserCart, getUserWishlist,
    getUserReview, deleteUserReview,
    deleteUserCartItem, deleteUserWishlistItem
}