const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type:String
    },
    zipCode: {
        type:String
    },
    city: {
        type:String
    },
    userState: {
        type:String
    }

}, { timestamps: true });
const User = mongoose.model('user', UserSchema);
module.exports = User;