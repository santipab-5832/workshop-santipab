var express = require('express');
var router = express.Router();
const authController = require('../controller/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;