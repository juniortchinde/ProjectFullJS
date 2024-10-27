const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images : {
        type: Array
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type : Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true 
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model('product', productSchema);