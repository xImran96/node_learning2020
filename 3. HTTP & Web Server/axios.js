const axios = require('axios');

let username = "Imran";

axios.get("http://api.gethub.com/users/" + username).then((res)=>{
  
    console.log(res.data);

}).catch((err)=>{

    console.log(err);
    
});

