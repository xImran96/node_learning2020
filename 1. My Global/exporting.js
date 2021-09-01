const emitter = require('./module/sendemail');



emitter.on('newEvent', (message)=>{

            console.log(`Email = ${message}`);

});

emitter.emit('newEvent', 'hello imran check your email for activation.');