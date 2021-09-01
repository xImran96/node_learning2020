const fs = require('fs');


fs.writeFile('./fileWrite.html', 'Hello this is new file', 'utf8', (err, content)=>{

    if(err)

    return err;

    console.log("the file is created.");
    

}); 



fs.appendFile('./fileWrite.html', 'Hello this file is append now', 'utf8', (err, content)=>{

    if(err)

    return err;

    console.log("the file is Appended.");
    

});