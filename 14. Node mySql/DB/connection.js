// const mySql = require('mysql');

// module.exports = ()=>{
// 	try{

		
// var connection = mySql.createConnection({
//   		host: 'localhost',
//   		user: 'root',
//   		password: '',
// 		database: 'nodejs'
// }).connect()


//  console.log('Database Connected');



// 	}catch(err){

// 		console.log('Database Connection Faild', err);

// 	}
// }

const mysql=require('mysql');
var mysqlconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});

module.exports=mysqlconnection;