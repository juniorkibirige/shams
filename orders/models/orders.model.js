const mongoose = require('../../common/services/mongoose.service').mongoose
const Schema = mongoose.Schema
const orderSchema = new Schema({
    uuid: String,
    transaction_tracker: String,
    merchant_reference: String
})

orderSchema.virtual('id').get(_ => {
    return this._id.toHexString()
})

orderSchema.set('toJSON', {
    virtuals: true
})

const orderModel = mongoose.model('Orders', orderSchema)
exports.createOrder = (orderData) => {
    const order = new orderModel(orderData)
    return order
        .save()
        .catch(e => {
            return e
        })
}

exports.getOrder = (id) => {
    try {
        return orderModel.findById(id).then(result => {
            if (result === null) return null
            result = result.toJSON()
            delete result._id
            delete result.__v
            return result
        })
    } catch (e) {
        console.log(e)
        return null
    }
}
