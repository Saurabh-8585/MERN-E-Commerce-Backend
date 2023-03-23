const User = require("../models/User");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const Review = require("../models/Review");

const deleteAllUserData = async (req, res) => {
    const { userId } = req.params;
    const findUser = await User.findById(userId)
    if (findUser) {
        try {
            const deleteUser = await User.findByIdAndDelete(userId);
            const deleteCart = await Cart.deleteMany({ user: userId });
            const deleteWishlist = await Wishlist.deleteMany({ user: userId });
            const deleteReview = await Review.deleteMany({ user: userId });
            res.send("delete successfully")
        } catch (error) {
            res.send("Something went wrong")
        }
    }
    else {
        res.status(400).send("User Not Found")
    }

}
module.exports = { deleteAllUserData }
// 63fccf8519623487fd3e4164