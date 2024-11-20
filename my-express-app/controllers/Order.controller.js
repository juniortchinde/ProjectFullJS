const Order = require('../models/Order.model');
const User = require('../models/User.model');


module.exports.createOrder = async (req, res) => {
    try {

        if(!req.pay){
            return res.status(401).send({ error: true, message : "not pay order"});
        }
        const newOrder = new Order(req.body);
        await newOrder.save();
    }

    catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }
}

module.exports.getOrders = async (req, res) => {
    try {

        const orders = await Order.aggregate([
            {$match: {userId: req.auth.userId}},
            {sort: {createdAt: -1}},
            {$limit: 10}
        ])

        if(!orders || !orders.length >0){
            return res.status(40).json({
                error: true,
                message : "No orders currently"
            })
        }

        return res.status(200).json({ error: false, orders});
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({error: true, message:"internal server error"})
    }
}