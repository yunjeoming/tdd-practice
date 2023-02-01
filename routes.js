const express = require('express');
const router = express.Router();
const productcontroller = require('./controller/products');

router.get('/', productcontroller.products)

module.exports = router;
