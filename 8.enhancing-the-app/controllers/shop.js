const Product = require('../models/product');
const Cart = require('../models/cart')

//exports.products = products;

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Product',
            path: '/products',
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId; //extract the parameter from the request where the parameter name is productId
    Product.findById(prodId, (product) => {
        //console.log(product);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Shop',
            path: '/products',
        });
    });

    //res.redirect('/')
    // console.log(prodId);
    // res.redirect('/');

}


exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
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
    //let cartProducts = [];
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });


    // renderCart(req, res, next);
    //res.redirect("/products")
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
    Product.fetchAll((products) => {
        res.render('shop/checkout', {
            pageTitle: 'Checkout',
            path: '/checkout',
        });
    });
}