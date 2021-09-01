const mongoose = require('mongoose');

module.exports = ()=>{
	try{
			mongoose.connect('mongodb://localhost:27017/nodeapi',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false})
			console.log('Database Connected.');
	}catch(err){
		throw new Error(err);
		console.log('Database Connection Failed', err);
	}
}