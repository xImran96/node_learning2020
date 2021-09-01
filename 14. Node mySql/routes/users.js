const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const connection = require('../DB/connection');

const register = Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
});


const login = Joi.object({
    
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
});






router.post('/register', async (req, res)=>{

	const { error } = register.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
    				name : req.body.name,
    				email : req.body.email,
    				password : hashPassword
    			};


    // const emailExist = await connection.query(`SELECT * FROM users WHERE email = '${req.body.email}' `);
    // if (emailExist) return  res.status(400).send('Email already exist.');


	connection.query(`INSERT INTO users SET ?`, data, function (err, results) {
		if (err) throw err
		res.send("User registered you can login and access api");
	});



});



router.post('/login', (req, res)=>{

 const { error } = login.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

connection.query(`SELECT * FROM users WHERE email = '${req.body.email}' `, function (err, results) {
  if (err) throw err


});


});

// router.get('/', (req, res)=>{


// connection.query('SELECT * FROM users', function (err, results) {
//   if (err) throw err

//   console.log('The solution is: ', results);
// res.json(results);
// });



// });



// router.post('/create', (req, res)=>{


//   // res.send(req.body);


// connection.query(`INSERT INTO users(name, email, sex, phone)
//  VALUES ('${req.body.name}', '${req.body.email}', '${req.body.sex}', '${req.body.phone}')`, function (err, results) {
//   if (err) throw err

//   console.log('The solution is: ', results);
// res.json(results);
// });
// });



// router.get('/user/:id', (req, res)=>{

//  connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`, function (err, results) {
//   if (err) throw err

//   console.log('The solution is: ', results);
// res.json(results);
// });

// });


// router.put('/user/:id', (req, res)=>{

// 	 connection.query(`UPDATE users SET name = '${req.body.name}', email = '${req.body.email}', sex = '${req.body.sex}', phone = '${req.body.phone}' WHERE id = '${req.params.id}' `, function (err, results) {
//   	if (err) throw err

// 		console.log('The solution is: ', results);
// 		res.json(results);
	
// 	});


// });


// router.delete('/user/:id', (req, res)=>{


//  connection.query(`DELETE FROM users WHERE id = ${req.params.id}`, function (err, results) {
//   if (err) throw err

//   console.log('The solution is: ', results);
//   res.json(results);

// });


// });




module.exports  = router;