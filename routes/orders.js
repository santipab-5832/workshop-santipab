var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken, isAdmin } = require('../middleware/token.middleware');
var orderController = require('../controller/order.controller');

router.get('/', verifyToken, orderController.getOrders)
router.get('/:productId', verifyToken, orderController.getOrdersByProduct);
router.post('/', verifyToken, orderController.addOrder);

module.exports = router;