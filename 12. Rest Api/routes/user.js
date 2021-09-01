const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const register = Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
});

const login = Joi.object({
    
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
});


router.post('/register', async (req,res) => {

    const { error } = register.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = User.find({email: req.body.email});
    if (emailExist) return  res.status(400).send('Email already exist.');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

     const newUser = new User({
    	name : req.body.name,
    	email: req.body.email,
    	password : hashPassword,
    		
    });

	try{
		const saveUser = await newUser.save()
		res.send('User Registered.');
	}catch(err)
	{
		res.send(err);
	}

});




router.post('/login', async (req,res) => {

    const { error } = login.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if (!user) return  res.status(400).send('Invalid Email');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return  res.status(400).send('Incorrect password.');

     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
     res.header('auth-token', token).send(token);

});





module.exports = router;
