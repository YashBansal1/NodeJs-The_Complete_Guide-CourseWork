const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
}

exports.getAddProduct = (req, res, next) => {

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        // product: { id: "", title: "", price: "", imageUrl: "", description: "" }
    });
}


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    //console.log(title, imageUrl, price, description)
    const product = new Product(null, title, imageUrl, description, price)
    product.save();
    res.redirect('/products');
}
//req.query.edit retrieves a query parameter with the key as edit.
//these query parameters are passed in our url at then end after ? mark as key value pair. There can be multiple query parameters in our url separated by & sign.

exports.getEditProduct = (req, res, next) => {
    const edit = req.query.edit;
    const prodId = req.params.productId;
    //console.log(prodId);
    Product.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: edit
        });
    });
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    //console.log(title, imageUrl, price, description)
    const product = new Product(prodId, title, imageUrl, description, price)
    product.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);
    //product.save();
    res.redirect('/admin/products');
}




