const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
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
    /*category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },*/
    description:{
        type: String
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('products', productSchema);