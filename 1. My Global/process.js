// console.log(process.argv);


// var flag = process.argv.indexOf('--user');

// console.log(flag+2);


// Standerd Object int/Out it help us to communicate with other process
process.stdout.write('What is your name?');

process.stdin.on('data', function(answer){
    console.log(answer.toString().trim());
    process.exit();
});
