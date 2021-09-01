//DB Nad Mongoose 
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/login', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

mongoose.connection
		.once('open', () => console.log('Database Connected'))
		.on('error', (err)=>{

			console.log('Could not Connected.', err)
		});


//Express 
const express = require('express');
const app = express();

//Object Export
const User = require('./models/User');

// Body-parser

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Bcrypt
const bcrypt = require('bcryptjs');


app.get('/', (req, res)=>{
    res.send("Root Page");
});

app.post('/register', (req, res)=>{

	const newUser = new User();

	newUser.email = req.body.email;
	newUser.password = req.body.password;

	bcrypt.genSalt(10, (err, salt)=>{
		bcrypt.hash(newUser.password, salt, (err, hash)=>{

			if(err) return err;

			newUser.password = hash;


				newUser.save().then(userSaved=>{

						res.send("User Register Successfully");

						}).catch(err=>{

						res.send("User Cannot Register" + err);

				});


		});
	});

});


app.post('/login', (req, res)=>{

		User.findOne({email: req.body.email}).then(user=>{
			if (user) {
				bcrypt.compare(req.body.password, user.password, (err, matched)=>{

					if (err) return err;

					if (matched) {
						res.send('User logged In Successfully.')
					}else{
						res.send('Invalid User');
					}
				});
			}
		})

});


app.listen(4111, ()=>{
    console.log('Server is running.')
});