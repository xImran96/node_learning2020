const express = require('express');
const dotEnv = require('dotenv');
const mysql = require('mysql')



const connection = require('./DB/connection');


dotEnv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
const products = require('./routes/products');
const user = require('./routes/users');


app.use('/api/v1/products', products);
app.use('/api/v1/user', user);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
	console.log(`Server Connected to ${PORT}`);
})