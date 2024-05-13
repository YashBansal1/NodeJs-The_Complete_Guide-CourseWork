'use strict'

//const http = require('http');
//const fs = require('fs');
const express = require("express");
//express package exports a function, therefore we export it as a function, and it will initialize a new object and the framework will store and manage a lot of things for us behind the scenes. So lot of logic is in this app handler. 

const bodyParser = require("body-parser");

const path = require("path")

const app = express();

const rootDir = require("./util/path.js");

app.use(bodyParser.urlencoded({ extended: false })); //it will be able to parse the non-default features

app.use(express.static(path.join(rootDir, 'public')));
//anything that tries to find the a .css or .javascript file, if we have such a request, it automatically forwards it to the public folder and therefore then the remaining path has to be everything but that public.
//we can register many static folder if we need.

const adminRoutes = require("./routes/admin.js");

const shopRoutes = require("./routes/shop.js");

// app.use(adminRoutes);

//#Filtering Paths
app.use('/admin', adminRoutes); //if we have such a setup where our paths in such a router file start with the same part or with the same segment then we can use this way to define that all our middleware request handler have this common part they start with.
app.use(shopRoutes);


//this app here actually happens to be a  valid request hadnler so we can pass the app to create server.
//app.get('/', (req, res) => {
//    res.end('Hello World');
//});

// app.use((req, res, next) => {
//     console.log("In the middleware");
//     next();
// }); 
//use allows us to add a new middleware function, it accepts the array of requests handler. 
//next argument is another function which is passed to the function passed inside the use function. This next function received as argument has to be executed to allow the request to travel to the next middleware.


// app.use('/add-product', (req, res, next) => {
//     console.log("In another middleware");
//     res.send(`<form action="/product" method = "POST"><input type="text" name = "title"><button type = "submit">Add Product</button></form>`);
// });

// app.use('/product', (req, res, next) => {
//     console.log(req.body); //gives undefined without body-parser, as by default the convenience method body doesn't try to parse the incoming request body. To do that we need to register a parser by adding another middleware and this middleware should be before our route handling middleware because parsing of the body should happen no matter where the request ends up.
//     //body parser return our request data in the form of an object.

//     res.redirect('/'); //redirect to the / endpoint
// }) //This middleware always execute not only for post requests but also for the get requests.

// app.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// }); //listens only for the post requests

//the request goes from our middleware through top to bottom.
//if  we respond to the request then we shouldn't call next because it will give an error.

// app.use('/', (req, res, next) => {
//     console.log("In another middleware");
//     res.send("<h1>Hello from express Again</h1>");
// });
//express js doesn't send a default response so we need to send a response in one of the defined middleware.



// const server = http.createServer(
//     app
// );

// server.listen(3000); 

//#Adding a error 404 Page
app.use((req, res, next) => {
    // res.status(404).send(`<h1>Page not found</h1>`);
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000);