const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const verifyToken = require('../middleware/verifyToken');



router.get('/', verifyToken, async (req, res)=>{

	try{
			const products = await Product.find();
			res.json(products);

	}catch(err){

			res.json({message: err});
	}

});



// router.post('/', (req, res)=>{

// 	const product = new Product(req.body);

// 	product.save().then(save=>{

// 		res.status(200).send("Product Added Successfully.");

// 	}).catch(err=>{

// 		res.send(err);
// 	});

// });


router.post('/', async (req, res)=>{

	const product = new Product(req.body);

	try{
			const saveProduct = await product.save();
			res.status(200).send("Product Added Successfully.");

	}catch(err){

			res.json({message: err});
	}
});




router.get('/:id', async (req, res)=>{

	try{
			const product = await Product.findById(req.params.id);
			res.json(product);

	}catch(err){
		
			res.json({message: err});
	}

});

router.get('/:id', async (req, res)=>{

	try{
			const product = await Product.findById(req.params.id);
			res.json(product);

	}catch(err){
		
			res.json({message: err});
	}

});

router.patch('/:id', async (req, res)=>{

	try{
			const product = await Product.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});
			res.json(product);

	}catch(err){
		
			res.json({message: err});
	}

});


router.delete('/:id', async (req, res)=>{

	try{
			const product = await Product.remove({_id:req.params.id});
			res.json(product);

	}catch(err){
		
			res.json({message: err});
	}

});

module.exports = router;
