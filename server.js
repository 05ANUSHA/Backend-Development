const http = require('http');


const server = http.createServer((req,res) =>{
    console.log('Anusha');

    res.end('Anusha');


});

server.listen(4000,()=>{
    console.log('server started on port 4000')
});