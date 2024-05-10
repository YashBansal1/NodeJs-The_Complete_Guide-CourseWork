//To run the script - node script.js
//console.log("Hello from node.js");

//Nodejs offers the file system functionality which enables us to work with the file system. For this we have to import it into the file to let the node that we want to use this functionality.

const fs = require('fs') //FS module is one of the node's core module shipping together with nodejs.

fs.writeFileSync('hello.txt', 'Hello from Node.js');

