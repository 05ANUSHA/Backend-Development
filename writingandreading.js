const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html');
    
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Form</title></head>');
        res.write('<body>');

        // Read and display messages
        fs.readFile('messages.txt', 'utf8', (err, data) => {
            if (!err && data) {
                const messages = data.split('\n').filter(Boolean);
                messages.forEach(message => {
                    res.write(`<p>${message}</p>`);
                });
            }
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1].replace(/\+/g, ' ');

            fs.readFile('messages.txt', 'utf8', (err, data) => {
                const messages = data ? data.split('\n').filter(Boolean) : [];
                messages.unshift(message);
                fs.writeFile('messages.txt', messages.join('\n'), (err) => {
                    if (err) {
                        console.log(err);
                        res.statusCode = 500;
                        res.end("Error saving the message");
                        return;
                    }
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                });
            });
        });
    } else if (url === '/home') {
        res.write('<html><body><h1>Welcome home</h1></body></html>');
        res.end();
    } else if (url === '/about') {
        res.write('<html><body><h1>Welcome to About Us page!</h1></body></html>');
        res.end();
    } else if (url === '/node') {
        res.write('<html><body><h1>Welcome to my Node Js project!!</h1></body></html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.write('<html><body><h1>Page not found</h1></body></html>');
        res.end();
    }
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
