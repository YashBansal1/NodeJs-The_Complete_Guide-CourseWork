const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  //this way of sharing data has one disadvantage, because this data in inherent to our nide server as it is running and therefore, it's shared, across all users.

  //  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  const products = adminData.products;
  res.render('shop', {
    prods: products, pageTitle: "My Shop", path: '/', hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,

  });
});

module.exports.routes = router;
