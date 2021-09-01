const http = require('http');
const fs = require('fs');

http.createServer((req, res)=>{
    let body = '';

    if(req.method === 'GET'){

        res.writeHead(200, {'Content-type' : 'text/html'})

        fs.readFile('./html2.html', 'UTF-8', (err, data)=>{

                if(err)
                return err;
                res.write(data);
                res.end();

        });

    }else if(req.method === 'POST'){
        req.on('data', (data)=>{

            body += data;

        });

        req.on('end', ()=>{

            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(body, ()=>{

                res.end();

            });

        });
    }else{

        res.writeHead(200, {'Content-type' : 'text/plain'});
        res.end('404');

    }

}).listen(4444);

console.log("Server is running");
