const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mongoose', { useNewUrlParser: true , useUnifiedTopology: true });

mongoose.connection
		.once('open', () => console.log('Connected'))
		.on('error', (err)=>{

			console.log('Could not Connected.', err)

});


app.get('/', (req, res)=>{
	res.send('Root');
});



app.get('/getusers', (req, res)=>{
	
	User.find({}).then(users=>{
		res.send(users);
	});

});


app.post('/adduser', (req, res)=>{
	
	const newUser = new User({
			firstName: 'Ali',
			lastName: 'Khan',
			isActive: 1
});

newUser.save().then(saveUser=>{
	console.log('Saved User.')
	res.send('User Saved.');
});

});



app.post('/useradd', (req, res)=>{
	
	const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			isActive: req.body.isActive
});

newUser.save().then(saveUser=>{
	console.log('User is saved')
	res.send('User is Saved.');
}).catch(err=>{

		res.status(404).send('User Cannot added due to error.');
})

});





app.patch('/update/:id', (req, res)=>{
	
	var id = req.params.id;

	const firstName = req.body.firstName;

	User.findByIdAndUpdate({_id: id}, {$set: {firstName: firstName}}, {new: true})
	.then(updateUser =>{
		res.send('User Updated.');
	})

});



app.put('/update/:id', (req, res)=>{
	
	var id = req.params.id;

	// const firstName = req.body.firstName;
	// const lastName = req.body.lastName;

	User.findOne(id).then(user=>{
		user.firstName = req.body.firstName;
		user.lastName  = req.body.lastName;
		user.save().then(putUpdate=>{
			res.send('Put User Updated')
		})
	});

});



app.delete('/delete/:id', (req, res)=>{
	var id = req.params.id;

	User.findOne({_id: id}).then(user=>{
		user.remove().then(userRemoved=>{
			res.send('User Deleted' + userRemoved)
		});
	});
	
});





// const newUser = new User({
// 			firstName: 'Muhammad',
// 			lastName: 'Imran',
// 			isActive: 1
// });

// newUser.save(function(err, dataSaved) {
// 	if(err) return err;

// 	console.log(dataSaved);
// });



const port = 4444 || process.env.PORT;

app.listen(port, ()=> {
		console.log(`Listening to ${port}`);
});