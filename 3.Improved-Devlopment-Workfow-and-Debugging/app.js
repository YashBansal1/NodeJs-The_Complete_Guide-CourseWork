'use strict'

const http = require('http'); //import core module
//const fs = require('fs');
const routes = require('./routes.js');

const server = http.createServer(
    routes.handler

);

server.listen(3000); //tells the server to listen on a particular port, we can pass a port of hostname as argument.
