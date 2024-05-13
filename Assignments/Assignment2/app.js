'use strict'

const html = require("http");

const express = require("express");

const app = express();

// app.use((req, res, next) => {
//     console.log("This is the first middleware function");
//     next();
// });

// app.use((req, res, next) => {
//     console.log("This is the second middleware function");
//     res.send("<h1>Hello this is the Assignment 2 task 1</h1>")
// })

app.use('/users', (req, res, next) => {
    console.log("This is the second middleware function");
    res.send("<h1>Hello this is the Assignment 2 task 2: New User</h1>")
});

app.use('/', (req, res, next) => {
    console.log("This is the second middleware function");
    res.send("<h1>Hello this is the Assignment 2 task 2: No users")
});



app.listen(3030);