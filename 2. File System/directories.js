const fs = require('fs');

// fs.mkdirSync("views");

fs.mkdir('views', (err)=>{

        if(err) 
        
        return err;

        fs.writeFile('./views/new.html', 'Hello this is new file', 'utf8', (err, content)=>{
            
            if(err)
        
            return err;
        
            console.log("the file is created.");

    });
        
});
