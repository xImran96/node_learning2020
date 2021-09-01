const express = require('express');
const router = express.Router();
const Brand = require('../../models/Brand');
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const Image = require('../../models/Image');
const fs = require('fs');
const path = require('path');
const { isEmpty, uploadDirProduct } = require('../../helpers/upload-helper');
const { isAuthenticated } = require('../../helpers/AuthAdmin');
const { isAdmin } = require('../../helpers/isAdmin');


router.all('/*',[isAuthenticated, isAdmin], (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();

});





router.get('/', (req, res)=>{

    Product.find({}).populate('category').populate('brand').lean().then(products=>{

        res.render('admin/products/index', {products: products});

    });
});



router.get('/create', (req, res)=>{

    Category.find().lean().then(categories=>{
        Brand.find().lean().then(brands=>{
            res.render('admin/products/create', {categories: categories, brands: brands});
        });
     
    });
      
});


router.post('/create', (req, res)=>{


    const newProduct = new Product({
        name:  req.body.name,
        category:  req.body.category,
        brand:  req.body.brand,
        specs:  req.body.specs, 
        price:  req.body.price,
        status:  req.body.status,
        
    });

    for (let i = 0; i < req.files.images.length; i++) {

        // console.log(req.files.images[i]);
        
        let myImage = req.files.images[i];
        const newImageName = Date.now() + '_' + myImage.name;
            const image = new Image({
                name: newImageName
            });
            newProduct.images.push(image);   
            myImage.mv('./public/upload/products/' + newImageName, (err)=>{
                if(err) throw err;
                     
                image.save();
        });

    }

    // console.log(newProduct);
    newProduct.save().then(createProduct=>{
        res.redirect('/admin/products');
    });
});


router.get('/edit/:id', (req, res)=>{
    
    Product.findOne({_id: req.params.id}).lean().then(product=>{

        Category.find({}).lean().then(categories=>{

            Brand.find({}).lean().then(brands=>{

                res.render('admin/products/edit', {product: product, categories: categories, brands: brands});
            });
        });
    });

});



router.put('/edit/:id', (req, res)=>{

    Product.findOne({_id: req.params.id}).then(product=>{

        product.name = req.body.name;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.specs = req.body.specs;
        product.price = req.body.price;
        product.status= req.body.status;
        
        product.save().then(updateProduct=>{
            // req.flash('success_message', 'Category was Successfully Updated.');
            res.redirect('/admin/products');
        });
        
        
    });

});



router.delete('/:id', (req, res)=>{
   
    Product.findOne({_id: req.params.id}).populate('images').then(product=>{

        if(!product.images.length < 1){
            for (let i = 0; i < product.images.length; i++) {    
            fs.unlink(uploadDirProduct + product.images[i].name, (err)=>{
                if (err) return err;
                    product.images.forEach(image=>{
                        image.remove();
                    });            
            });       
        }
    }
        product.remove().then(deleteProduct=>{
            //  req.flash('success_message', 'Post was Successfully deleted.');
                res.redirect('/admin/products');
             });
        
     });
});


module.exports = router;