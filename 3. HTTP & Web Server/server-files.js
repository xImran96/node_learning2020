const http = require('http');
const fs = require('fs');

http.createServer((req, res)=>{

        console.log(req.method);
        
        if(req.url === "/"){
            fs.readFile("./html.html", "UTF-8", (err, data)=>{

                res.writeHead(200, {'Content-type': 'text/html'});

                res.end(data);

            });
        }else{
            res.writeHead(200, {'Content-type': 'text/plain'});

                res.end("400 error");
        }

}).listen(8003);

console.log("Server is Running.");


