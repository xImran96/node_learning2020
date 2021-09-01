const http = require('http');

const server = http.createServer((req, res)=>{


    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Hi guys, this is Imran');



});

server.listen(8006);
console.log("Server Is running Now.");
