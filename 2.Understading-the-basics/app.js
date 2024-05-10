'use strict'

// Core Modules
//http, https, fs, path, os

//http and https core modules helps with creating a server and  working with http requests and responses.

//http - helps us with launching a server or also with other tasks like sending requests  because a node app could send a requests to another server.

//https - launch an ssl encoded server, where all the data is transferred is encrypted.

// the variable that are exposed globally by nodejs can be used it by default in any file we run via nodejs. Ex- require

const http = require('http'); //import core module
const fs = require('fs');


const server = http.createServer(function (req, res) {
    console.log(req.url, req.method, req.headers);
    //console.log(req);
    // process.exit();
    const url = req.url;
    if (url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url == '/message' && req.method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //fs.writeFileSync('message.txt', message); //blocks the execution of code 
            console.log(parsedBody);
            // res.statusCode = 302;
            // res.setHeader('Location', '/');
            // return res.end();

            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                console.log(err.message('this is error'));
                return res.end();

            }); //doesn't block the execution of code, asynchronously write data to the file, and replace the file if already exists.
            //also take callback function as argument which allow us to deal with the error if any occurs

        }); // put in to be executed and executed when there is chunk of data that need to be processed
        //if we do something in the event listener that should influence in the response, then we should move our response code into the even listener if we have such a dependency.

        // fs.writeFileSync('message.txt', 'txt');
        // res.statusCode = 302;
        // res.setHeader('Location', '/');
        // return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}); //create the server using http method create server which takes an even listener as argument and returns an new instance of server.

server.listen(3000); //tells the server to listen on a particular port, we can pass a port of hostname as argument.

//console.log(server);