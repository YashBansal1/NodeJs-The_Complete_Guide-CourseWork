const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(p, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(data);
            }
            // Analyze the cart - Find existing product
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            //console.log(existingProductIndex);
            //console.log(existingProduct);
            let updatedProduct;
            if (existingProduct) {
                //alert("Product already exists");

                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                //console.log(updatedProduct);
                //console.log(cart.products);
                cart.products[existingProductIndex] = updatedProduct;
                //console.log(cart.products);
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                // Product.findById(id, (products) => {
                //     const product = products.find(p => p.id === id);
                //     cart.products.push(product);
                // });
                // fs.writeFile(p, JSON.stringify(cart), (err) => {
                //     console.log(err);
                // });
                cart.products = [...cart.products, updatedProduct];
                //console.log(cart.products);
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }

    static getCart(cb) {
        getProductsFromFile(cb);
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            if (err) {
                // console.log("Returned From Cart");
                return;
            }
            const cart = JSON.parse(data);
            const updatedCart = { ...cart };
            //console.log(updatedCart);
            const product = updatedCart.products.find(p => p.id == id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            // console.log(updatedCart);
            updatedCart.totalPrice = updatedCart.totalPrice - Number(productPrice) * productQty;

            console.log(updatedCart);
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            })
        });
    }
}

//Analyze the cart => Find existing product
//Add new Product and increase quantity
