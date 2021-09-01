const express = require('express');
const router = express.Router();
const connection = require('../DB/connection');



router.get('/', (req, res)=>{

	connection.query('SELECT * FROM products', function (err, results) {
  		if (err) throw err

  		console.log('The solution is: ', results);
		res.json(results);
	});

});



router.post('/add', (req, res)=>{


connection.query(`INSERT INTO products(name, brand, price, about)
 VALUES ('${req.body.name}', '${req.body.brand}', '${req.body.price}', '${req.body.about}')`, function (err, results) {
  if (err) throw err

  console.log('The solution is: ', results);
res.json(results);
});
});


router.get('/:id', (req, res)=>{

 connection.query(`SELECT * FROM products WHERE id = ${req.params.id}`, function (err, results) {
  if (err) throw err

  console.log('The solution is: ', results);
res.json(results);
});

});


router.put('/:id', (req, res)=>{

	 connection.query(`UPDATE products SET name = '${req.body.name}', brand = '${req.body.brand}', price = '${req.body.price}', about = '${req.body.about}' WHERE id = '${req.params.id}' `, function (err, results) {
  	if (err) throw err

		console.log('The solution is: ', results);
		res.json(results);
	
	});


});


router.delete('/:id', (req, res)=>{


 connection.query(`DELETE FROM products WHERE id = ${req.params.id}`, function (err, results) {
  if (err) throw err

  console.log('The solution is: ', results);
  res.json(results);

});


});





module.exports  = router;