const { Schema, model } = require("mongoose");

const schemaUser = new Schema({
    name:{
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required'
    },
    password: {
        type: String,
        required: true
    },
    photoURL:{
        type: String,
        required: true
    },
    country: {
        type: String
    }
})

const User = model('User', schemaUser)

module.exports = User