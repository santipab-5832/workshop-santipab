var orderSchema = require('../models/order.model')
var productSchema = require('../models/product.model')

exports.getOrders = async function (req, res, next) {
    try{
        let order = await orderSchema.find({})
        res.status(200).json({
            status: 200,
            message: 'Success',
            data: order
        });
    } catch(error){
        res.status(500).send(error)
    }
}

exports.getOrdersByProduct = async function (req, res, next) {
    try{
        let { id } = req.params;

        let order = await orderSchema.find({ productId: productId });
        res.status(200).json({
            status: 200,
            message: 'Success',
            data: order
        });
    } catch(error){
        res.status(500).send("Error")
    }
}

exports.addOrder = async function (req, res, next) {
    try{
        let { id } = req.params;
        let { userId, quantity } = req.body;
        let product = await productSchema.findById(id);

        if (quantity > product.stock) {
            return res.status(400).send("ไม่สามารถเพิ่ม Order ได้");
        }

        let order = new orderSchema({ userId, productId: id, quantity });
        await order.save();

        await productSchema.findByIdAndUpdate(id, { $inc: { stock: -quantity } });
        res.status(201).json({
            status: 201,
            message: 'Added order!',
            data: order
        });
    } catch(error){
        res.status(500).send(error)
    }
}