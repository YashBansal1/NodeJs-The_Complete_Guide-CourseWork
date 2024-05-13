const express = require("express");


//#Using express router
const router = express.Router();

const path = require("path");

const rootDir = require("../util/path");

router.get('/add-product', (req, res, next) => {
    console.log("In another middleware");
    // res.send(`<form action="/product" method = "POST"><input type="text" name = "title"><button type = "submit">Add Product</button></form>`);

    // res.send(`<form action="/admin/add-product" method = "POST"><input type="text" name = "title"><button type = "submit">Add Product</button></form>`);

    // res.sendFile('/Users/yashbansal/Wissen_Courses/NodeJs-The-Complete-Guide/4.working-with-express.js/views/add-product.html');

    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))

    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

// router.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// });

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;