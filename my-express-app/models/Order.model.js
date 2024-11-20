const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,  required: true, ref: 'users'},
    productList: {type: Array, required: true},
    destination: {
        type: {
                _id: false,
                name: { type: String, required: true },
                phone: { type: String, required: true },
                address: { type: String, required: true },
            },
        required: true
    },
    amount: {type: Number, required: true},
    status: {type: String, required: true},
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('orders', orderSchema)