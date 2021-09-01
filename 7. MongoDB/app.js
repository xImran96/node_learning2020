// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/animals', { useNewUrlParser: true , useUnifiedTopology: true });

// mongoose.connection
// 		.once('open', () => console.log('Connected'))
// 		.on('error', (err)=>{

// 			console.log('Could not Connected.', err)

// 		});



// var MongoClient = require('mongodb').MongoClient

// MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function (err, db) {
//   if (err) throw err

//   	console.log('Connected');
  // db.collection('mammals').find().toArray(function (err, result) {
  //   if (err) throw err

  //   console.log(result)
  // })
// })



// var MongoClient = require('mongodb').MongoClient

// var {MongoClient} = require('mongodb');
// MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function (err, client) {
//   if (err) throw err


//   	const db = client.db('animals');

//   db.collection('mammals').insertOne({
//   	// name: 'Horse'
//   	name: 'Horse',
//   	legs: 4
//   }, (err, result)=>{
//   	if (err) return console.log(err);
//   })
  


//   	console.log('Inserted');
//   // db.collection('mammals').find().toArray(function (err, result) {
//   //   if (err) throw err

//   //   console.log(result)
//   // })
// })




// var {MongoClient, ObjectId} = require('mongodb');
// MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function (err, client) {
//   if (err) throw err


//   	const objectId = new ObjectId();

//   	console.log(objectId);

//   console.log('Connected.');

//   // 	const db = client.db('animals');

//   // db.collection('mammals').insertOne({
//   // 	// name: 'Horse'
//   // 	name: 'Horse',
//   // 	legs: 4
//   // }, (err, result)=>{
//   // 	if (err) return console.log(err);
//   // })
  


//   // 	console.log('Inserted');
//   // db.collection('mammals').find().toArray(function (err, result) {
//   //   if (err) throw err

//   //   console.log(result)
//   // })
// })



// Getting Data From Mongo Db


// var {MongoClient, ObjectId} = require('mongodb');
// MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function (err, client) {
//   if (err) throw err

//   console.log('Connected.');

//   	const db = client.db('animals');

//   // db.collection('mammals').insertOne({
//   // 	// name: 'Horse'
//   // 	name: 'Horse',
//   // 	legs: 4
//   // }, (err, result)=>{
//   // 	if (err) return console.log(err);
//   // })
  


//   // 	console.log('Inserted');
//   db.collection('mammals').find().toArray(function (err, result) {
//     if (err) throw err

//     console.log(result)
//   })
// })





// // Updating
// var {MongoClient, ObjectId} = require('mongodb');
// MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function (err, client) {
//   if (err) throw err

//   console.log('Connected.');

//   	const db = client.db('animals');

//   db.collection('mammals').findOneAndUpdate({
//   	_id: new ObjectId('5f3a940f35343a38d0c5eb75')

//   },

//   {$set: {name: 'Cow', legs: 4}}


//   ).then(result => {
//   	console.log(result);
//   }).catch(err => {
//   	console.log(err);
//   });
   

// });



// Deleting
var {MongoClient, ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function (err, client) {
  if (err) throw err

  console.log('Connected.');

  	const db = client.db('animals');

  	  // db.collection('mammals').deleteOne({name: Cow});
  	  // db.collection('mammals').deleteMany({name: Cow});

  db.collection('mammals').findOneAndDelete({
  	_id: new ObjectId('5f3a940f35343a38d0c5eb75')

  }).then(result => {
  	console.log(result);
  }).catch(err => {
  	console.log(err);
  });
   

});