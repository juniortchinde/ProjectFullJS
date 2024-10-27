
const mongoose = require('mongoose');

const UserTokenSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
        expires: 10 * 86400
    }
})

module.exports = mongoose.model('UserToken', UserTokenSchema);