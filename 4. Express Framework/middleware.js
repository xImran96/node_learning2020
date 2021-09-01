const express = require('express');

const port = process.env.PORT || 9999; 

var app = express();


app.use('/css', express.static(__dirname + '/public'));


// app.use('/css', (req, res, next)=>{

//     console.log('This is middleware.');
//     next();    

// });

app.use((req, res, next)=>{

    console.log('This is middleware.');
    next();    

});


app.get('/', (req, res)=>{
    // res.send('<h1>Its Working</h1>')

    res.send(
    <html>
        <head>
            <title>
                Middleware
            </title>
            <link href="/css/style.css">
        </head>
        <body>
            <h2>This is Middleware</h2>
        </body>
    
    </html>);
});



app.listen(port);

console.log("server running");