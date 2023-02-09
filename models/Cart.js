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
    // image: String,
    // description: String,
    // name: String,
    // brand: String,
    // price: Number,
    // rating:Number,
    // category: String,
    // type:String,
})

module.exports = mongoose.model("cart", CartSchema)