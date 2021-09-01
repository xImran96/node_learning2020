1const express = require('express');
const dotEnv  = require('dotenv');
const cors  = require('cors');
const dbConnection  = require('./DB/connection');


dotEnv.config();
dbConnection();
const app = express();

//Middlewares
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(cors());

//routes
	const products = require('./routes/products');
	const user = require('./routes/user');


	app.use('/api/v1/products', products);
	app.use('/api/v1/user', user);


app.get('/', (req, res)=>{
	res.send("Welcome to Node.js");
});



const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=>{
	console.log(`Server Connected to ${PORT}`);
});

