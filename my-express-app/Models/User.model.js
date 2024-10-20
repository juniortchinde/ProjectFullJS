const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
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
    phone: {
        type: String
    },
    adress: {
        type: String
    },
    profil: {
        type: String,
        default: "default"
    }
})

module.exports = mongoose.model('User', userSchema);