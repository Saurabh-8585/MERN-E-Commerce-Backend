const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name: String,
    brand: String,
    price: Number,
    category: String,
    image: String,
    rating: Number,
    type: String
})

module.exports = mongoose.model("product", ProductSchema)