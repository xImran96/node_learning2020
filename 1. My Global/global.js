var path = require("path");

// console.log("Ir works");

// global.console.log("Ir works");


var name = "Muhammad Imran";
var nameNew = name.toUpperCase();


global.console.log(global.name);


global.console.log(`New Name is ${nameNew}`);

console.log(__dirname);
console.log(__filename);

console.log(path.basename(__filename));

