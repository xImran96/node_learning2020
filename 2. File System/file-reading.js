const fs = require('fs');

fs.readdir('.', (err, content)=>{

    if(err)
    return err;

    console.log(content);
    

});


fs.readFile('html.html', 'UTF-8', (err, content)=>{


    console.log(content);
    

});