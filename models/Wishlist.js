const mongoose = require('mongoose');
const { Schema } = mongoose;
const WishlistSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
})

module.exports = mongoose.model("wishlist", WishlistSchema)