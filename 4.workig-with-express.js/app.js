'use strict'

const http = require('http');
//const fs = require('fs');
const express = require("express");
//express package exports a function, therefore we export it as a function, and it will initialize a new object and the framework will store and manage a lot of things for us behind the scenes. So lot of logic is in this app handler. 

const app = express();
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

app.use('/add-product', (req, res, next) => {
    console.log("In another middleware");
    res.send(`<h1>The "Add Product" Page</h1>`);
});

//the request goes from our middleware through top to bottom.
//if  we respond to the request then we shouldn't call next because it will give an error.

app.use('/', (req, res, next) => {
    console.log("In another middleware");
    res.send("<h1>Hello from express Again</h1>");
});
//express js doesn't send a default response so we need to send a response in one of the defined middleware.



// const server = http.createServer(
//     app
// );

// server.listen(3000); 
app.listen(3000);