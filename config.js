const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const URL = process.env.MONGO_URL
mongoose.set('strictQuery', true)
const connectToMongo = async () => {
    try {
        let db = await mongoose.connect(URL)
        console.log(db.connection.host);
    } catch (error) {
        console.log(error);
    }

    // const f = await User.find();
    // console.log(f);
}

module.exports = connectToMongo;