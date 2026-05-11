var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken, isAdmin } = require('../middleware/token.middleware');
const productController = require('../controller/products.controller');
const orderController = require('../controller/order.controller');

router.get('/', verifyToken, productController.getProducts);
router.get('/:id', verifyToken, productController.getProductsById);
router.post('/',  [verifyToken, isAdmin], productController.createProduct);
router.put('/:id', [verifyToken, isAdmin], productController.editProduct);
router.patch('/:id', [verifyToken, isAdmin], productController.editProductById);
router.delete('/:id', [verifyToken, isAdmin], productController.deleteProduct);

router.get('/:id/orders', verifyToken, orderController.getOrdersByProduct);
router.post('/:id/orders', verifyToken, orderController.addOrder);

module.exports = router;