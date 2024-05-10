'use strict'

// Core Modules
//http, https, fs, path, os

//http and https core modules helps with creating a server and  working with http requests and responses.

//http - helps us with launching a server or also with other tasks like sending requests  because a node app could send a requests to another server.

//https - launch an ssl encoded server, where all the data is transferred is encrypted.

// the variable that are exposed globally by nodejs can be used it by default in any file we run via nodejs. Ex- require

const http = require('http'); //import core module
//const fs = require('fs');
const routes = require('./routes.js');

const server = http.createServer(
    routes.handler
    // routes
    //     function (req, res) {
    //     // console.log(req.url, req.method, req.headers);
    //     // //console.log(req);
    //     // // process.exit();
    //     // const url = req.url;


    // }
); //create the server using http method create server which takes an even listener as argument and returns an new instance of server.

server.listen(3000); //tells the server to listen on a particular port, we can pass a port of hostname as argument.

//console.log(server);