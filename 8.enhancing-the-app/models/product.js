//const products = [];
const fs = require('fs');
const path = require('path');
//const rootDir = require('../util/path');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
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

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
// module.exports = function Product() {

// }