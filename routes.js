const express = require('express');
const router = express.Router();
const productcontroller = require('./controller/products');

router.get('/', productcontroller.getProducts);

router.post('/', productcontroller.createProduct);

router.get('/:productId', productcontroller.getProductById);

router.put('/:productId', productcontroller.updateProduct);

module.exports = router;
