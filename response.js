const http = require ('http')
const server = http.createServer((req,res) => {
 
    console.log(req.url, req.method, req.headers);

    //Responses
    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    if(url === '/home') {
        res.write('<html><body><h1>Welcome home</h1></body></html>');
    } else if (url === '/about') {
        res.write('<html><body><h1>Welcome to About Us page!</h1></body></html>');
    } else if (url === '/node') {
        res.write('<html><body><h1>Welcome to my Node Js project!!</h1></body></html>');
    } else {
        res.write('<html><body><h1>Page not found</h1></body></html>');
    }
    res.end();
});

server.listen(4000, () => {
    console.log('Server is running on port 4000')
    console.log('Server is running on port 4000');
});