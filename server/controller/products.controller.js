var productSchema = require("../models/product.model");

exports.getProducts = async function (req, res, next) {
  try {
    let product = await productSchema.find({});
    res.status(200).json({
      status: 200,
      message: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductsById = async function (req, res, next) {
  try {
    let { id } = req.params;
    let product = await productSchema.findById(id);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createProduct = async function (req, res, next) {
  try {
    let { name, price, stock } = req.body;

    let product = new productSchema({
      name: name,
      price: price,
      stock: stock,
    });

    await product.save();
    res.status(201).json({
      status: 201,
      message: "Created Product",
      data: product,
    });
  } catch (error) {
    res.status(500).send("Failed Create");
  }
};

exports.editProduct = async function (req, res, next) {
  try {
    let { name, price, stock } = req.body;
    let { id } = req.params;

    let product = await productSchema.findByIdAndUpdate(
      id,
      { name, price, stock },
      { new: true },
    );
    res.status(200).json({
      status: 200,
      message: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).send("Edit Failed");
  }
};

exports.editProductById = async function (req, res, next) {
  try {
    let { id } = req.params;
    let updates = req.body;

    let product = await productSchema.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true },
    );
    res.status(200).json({
      status: 200,
      message: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).send("Edit some product Failed");
  }
};

exports.deleteProduct = async function (req, res, next) {
  try {
    let { id } = req.params;

    let product = await productSchema.findByIdAndDelete(id);
    res.status(204).json({
      status: 204,
      message: "Success",
    });
  } catch (error) {
    res.status(500).send("Error");
  }
};
