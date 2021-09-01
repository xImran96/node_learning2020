const express = require('express');
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 9999; 

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
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

    res.send()
});


app.post('/post', (req, res)=>{

    res.send(`${req.body.username}`);
    console.log(req.body);
    
});


app.listen(port);

console.log("server running");