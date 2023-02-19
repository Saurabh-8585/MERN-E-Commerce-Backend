const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const URL = process.env.MONGO_URL
// mongoose.set('strictQuery', true)
const connectToMongo = () => {
    mongoose.connect(URL, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;