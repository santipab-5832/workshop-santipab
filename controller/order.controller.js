var orderSchema = require('../models/order.model')
var productSchema = require('../models/product.model')

exports.getOrders = async function (req, res, next) {
    try{
        let order = await orderSchema.find({})
        res.status(200).send(order)
    } catch(error){
        res.status(500).send(error)
    }
}

exports.getOrdersByProduct = async function (req, res, next) {
    try{
        let { productId } = req.params;

        let order = await orderSchema.find({ productId: productId });
        res.status(200).send(order)
    } catch(error){
        res.status(500).send("Error")
    }
}

exports.addOrder = async function (req, res, next) {
    try{
        let { userId, productId, quantity } = req.body;
        let product = await productSchema.findById(productId);

        if (quantity > product.stock) {
            return res.status(400).send("จำนวนสินค้าเกินสต็อก");
        }

        let order = new orderSchema({ userId, productId, quantity });
        await order.save();

        await productSchema.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
        res.status(201).send(order)
    } catch(error){
        res.status(500).send(error)
    }
}