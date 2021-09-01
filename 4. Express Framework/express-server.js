const express = require('express');

const port = process.env.PORT || 9999; 

var app = express();

app.get('/', (req, res)=>{
    res.send('<h1>Its Working</h1>')
});


app.get('/about-us', (req, res)=>{

    res.send('<h1> About Us </h1>')

});


app.get('/api', (req, res)=>{

    // res.send('<h1>Api</h1>');
    res.json({name: 'Imran'});
});
app.listen(port);

console.log("server running");