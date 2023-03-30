const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const URL = process.env.MONGO_URL
mongoose.set('strictQuery', true)
const connectToMongo = () => {
    mongoose.connect(URL)
        .then((c) => {
            console.log(`Mongodb connect to: ${c.connection.host}`);
        })
        .catch((e) => {
            console.log(e);
        });
}

module.exports = connectToMongo;