'use strict'

const http = require("http");
const route = require("./routes.js");

const users = [{ name: 'Abigail', }, { name: 'John', }, { name: 'Jasmine', }];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>')
        res.write('<h1>Hello user</h1>');
        res.write('<form action = "/create-user" method = "POST"><input type = "text" name = "username"><button type = "submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>')
        res.write('<ul>');
        users.forEach((user) => {
            res.write(`<li>${user.name}</li>`);
        })
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    route.handler(req, res);

}
);

server.listen(3000);
