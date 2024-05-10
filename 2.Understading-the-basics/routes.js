const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url == '/') {
        // res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action = "/message" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    if (url == '/message' && method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        return req.on('end', () => {
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
                // console.log(err.message('this is error'));
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
}

module.exports = {
    handler: requestHandler,
    someText: "some hard coded text"
};
//module.exports.handler = requestHandler
//exports.handler = requestHandler //shortcut supported by nodejs
//module.exports = requestHandler; //module is keyword or object exposed globally which have export properties and we can assign a value like our request handler
//In node module system, the file content here is actually cached by node and we can't edit it externally.