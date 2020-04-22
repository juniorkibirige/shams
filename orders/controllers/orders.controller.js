const OrderModel = require('../models/orders.model')
const crypto = require('crypto')

exports.addOrder = (req, res) => {
    OrderModel.createOrder(req.body)
        .then((result) => {
            if(result.name == 'MongoError') {
                res.status(400).send({ status: 400, result: result })
            } else 
            res.status(201).send({ id: result._id })
        })
}

exports.getOrder = (req, res) => {
    req.body = req.query
    OrderModel.getOrder(req.body)
        .then((result)=>{
            res.status(200).send(result)
        })
}