const Product = require('../models/product');
const Cart = require('../models/cart')

//exports.products = products;

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('shop/product-list', {
            prods: rows,
            pageTitle: 'All Product',
            path: '/products',
        });
    }).catch(err => {
        console.log(err);
    });

}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(([rows]) => {
        res.render('shop/product-detail', {
            product: rows[0],
            pageTitle: 'Shop',
            path: '/products',
        });
    }).catch(err => {
        console.log(err);
    });
}


exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('shop/index', {
            prods: rows,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch(err => {
        console.log(err);
    });

}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                };
            }
            res.render('shop/cart', {
                products: cartProducts,
                pageTitle: 'Your Cart',
                path: '/cart',
            });
        })

    });
}

exports.postCart = (req, res, next) => {

    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });

    res.redirect("/cart");

}

exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;

    console.log(prodId);
    // console.log(product);
    Product.findById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
    })
    res.redirect('/cart');
}
exports.getOrders = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/orders', {
            pageTitle: 'Your Orders',
            path: '/orders',
        });
    });
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('shop/checkout', {
            pageTitle: 'Checkout',
            path: '/checkout',
        });
    }).catch(err => {
        console.log(err);
    });
}