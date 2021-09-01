const fs = require('fs');

// fs.rmdirSync('./newDir');




try{

    fs.unlinkSync('./newDir/newDir.html')

}catch(err){

    console.log(err + 'File removed From Folder.');
    


}