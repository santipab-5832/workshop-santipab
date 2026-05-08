var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const productController = require('../controller/products.controller')

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductsById);
router.post('/', productController.createProduct);
router.put('/:id', productController.editProduct);
router.patch('/:id', productController.editProductById);
router.delete('/:id', productController.deleteProduct);


module.exports = router;