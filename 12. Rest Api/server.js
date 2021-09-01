const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbconnection = require("./database/connection")


//DB Connection 
dbconnection();
dotEnv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
// const myMiddleware = (req, res, next)=>{

// 	console.log("Hey It Imran");
// 	next();
// }

// app.use(myMiddleware);



// Routes 

app.get('/',(req, res, next)=>{
	res.send('Welcome To Node.js');
})

const products = require('./routes/products');
app.use('/api/v1/products', products);







const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
	console.log(`Server connected to ${PORT}`);
});

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
  	status: 500,
  	message: err.message,
  	body: {}
  });
});


