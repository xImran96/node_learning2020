const https = require('https');
const http = require('http');
const fs = require('fs');

const url = 'https://jsonplaceholder.typicode.com/posts';


http.createServer((req, serverRes)=>{


        if(req.method === 'GET' && req.url === '/posts'){

                https.get(url, (httpsResponse)=>{

                    httpsResponse.on('data', data => {

                        httpsResponse.setEncoding('utf8');

                        console.log(data);
                        
                        serverRes.write(data);
                    });

                        httpsResponse.on('end', ()=>{
                                serverRes.end();
                                console.log('its Over');
                                
                        });
                });

        }else{
            serverRes.writeHead('404', {'Content-Type': 'text/plain'});
            serverRes.end('There must be an error');
        }




}).listen(4444);

console.log('Server is runing....');
