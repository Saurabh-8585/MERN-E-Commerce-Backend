const mongoose = require('mongoose');
const { Schema } = mongoose;
const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    rating: {
        type: Number,
    },
    comment: {
        type: String
    },
   

}, { timestamps: true })


module.exports = mongoose.model("review", ReviewSchema)