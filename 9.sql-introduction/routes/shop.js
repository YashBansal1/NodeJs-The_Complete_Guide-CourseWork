const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
//const adminData = require('../controllers/products.js');
const shopController = require("../controllers/shop");

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

// router.get('/products/delete'); we can't use this below the above statement because if we use it here then even when /products/delete is exposed it will go inside the above router and call its controller.

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteItem)

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
