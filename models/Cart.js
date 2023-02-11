const mongoose = require('mongoose');
const { Schema } = mongoose;
const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },

}, { timestamps: true })

module.exports = mongoose.model("cart", CartSchema)