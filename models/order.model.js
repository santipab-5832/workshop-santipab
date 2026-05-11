const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    productId: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: Number,
    status: { type: String, default: 'pending' }
}, {
    timestamps: true    // creatAt, updateAt
})

module.exports = mongoose.model('orders', orderSchema)