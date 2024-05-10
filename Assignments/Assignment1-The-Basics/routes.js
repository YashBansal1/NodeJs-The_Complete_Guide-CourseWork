'use strict'

const createUserHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url == '/create-user' && method == "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        })
    }
}

module.exports.handler = createUserHandler;