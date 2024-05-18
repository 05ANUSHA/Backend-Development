
const fs = require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html');

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Form</title></head>');
        res.write('<body>');
        fs.readFile('message.txt',(err,data) => {
            if(!err && data) {
                res.write(`<p> ${data} </p>`);
            }
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
            res.write('</body>');
            res.write('</html>');
            return res.end();
        })
    }

    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if(err) {
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
    }  
    else {
        res.statusCode = 404;
        res.write('<html><body><h1>Page not found!</h1></body></html>');
        res.end();
    }  
}
module.exports = requestHandler;

