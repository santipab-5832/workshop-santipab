var orderSchema = require("../models/order.model");
var productSchema = require("../models/product.model");

exports.getOrders = async function (req, res, next) {
  try {
    let order = await orderSchema.find({});
    res.status(200).json({
      status: 200,
      message: "Success",
      data: order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOrdersByProduct = async function (req, res, next) {
  try {
    let { id } = req.params;

    let order = await orderSchema.find({ productId: productId });
    res.status(200).json({
      status: 200,
      message: "Success",
      data: order,
    });
  } catch (error) {
    res.status(500).send("Error");
  }
};

exports.addOrder = async function (req, res, next) {
  try {
    let { id } = req.params;
    let { quantity } = req.body;
    let userId = req.auth.id;

    let product = await productSchema.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    if (quantity > product.stock) {
      return res.status(400).send("ไม่สามารถเพิ่ม Order ได้");
    }

    let order = new orderSchema({ userId, productId: id, quantity });
    await order.save();

    await productSchema.findByIdAndUpdate(id, { $inc: { stock: -quantity } });
    res.status(201).json({
      status: 201,
      message: "Added order!",
      data: order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateOrderStatus = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["pending", "success", "cancel"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid status",
      });
    }

    const order = await orderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Updated order status!",
      data: order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteOrder = async function (req, res, next) {
  try {
    const { id } = req.params;

    const order = await orderSchema.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Deleted order!",
      data: order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};