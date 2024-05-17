//const products = [];
const fs = require('fs');
const path = require('path');
const { getDeleteProduct } = require('../controllers/admin');
//const rootDir = require('../util/path');
const Cart = require("../models/cart");

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

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


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            console.log(this.id)
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            }
            else {
                this.id = Math.random().toString();

                products.push(this);

                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        })
        //products.push(this);
        // fs.readFile(p, (err, fileContent) => {

        //     let products = [];
        //     if (!err) {
        //         products = JSON.parse(fileContent);
        //     }
        //     products.push(this);
        //     fs.writeFile(p, JSON.stringify(products), (err) => {
        //         console.log(err);
        //     });
        // });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id == id);
            // const productIndex = products.findIndex(p => p.id === id);
            // const removeProduct = [...products];
            // removeProduct.splice(productIndex, 1);
            const updatedProducts = products.filter(p => p.id !== id)
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                Cart.deleteProduct(id, product.price);
            });
        }
        )
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}
// module.exports = function Product() {ß

// }