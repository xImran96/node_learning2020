var readline = require('readline');
var util = require('util');
// is a wrapper around Process Standerd Out/in object with more functionality on top of it

var RL  = readline.createInterface(process.stdin, process.stdout);

RL.question('What is your name? ', (name)=>{
        RL.setPrompt(`${name} How old are you?.`);
        RL.prompt();
        RL.on('line', (age)=>{
                if(age < 18){
                    util.log(`${name.trim()} your age is less then 18. Can't processed further.`);
                    
                }else{
                    util.log(`${name.trim()} your age is above then 18. Can processed further.`);   
                }
        });
});