const express = require('express');

var app = express();

    app.get('/', (req, res)=>{

        res.send('<h1>Routes Params</h1>');

    });


    
    app.get('/post/:id/category/:category_id/', (req, res)=>{

        res.send(`<p>Here is post no ${req.params.id}</p>
            <p>Here is category no ${req.params.category_id}</p>`
            );

    });

app.listen(9999);

console.log("Server is Running");
