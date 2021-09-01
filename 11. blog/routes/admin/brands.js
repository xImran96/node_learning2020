const express = require('express');
const router = express.Router();
const Brand = require('../../models/Brand');
const Category = require('../../models/Category');
const fs = require('fs');
const { isEmpty, uploadDirBrands } = require('../../helpers/upload-helper');
const { isAdmin } = require('../../helpers/isAdmin');
const { isAuthenticated } = require('../../helpers/AuthAdmin');

router.all('/*', [isAuthenticated, isAdmin], (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();

});



router.get('/', (req, res)=>{

        Brand.find({}).populate('category').lean().then(brands=>{
        res.render('admin/brands/index', {brands: brands});
        });
             
});


router.get('/create', (req, res)=>{

    Category.find().lean().then(categories=>{
        res.render('admin/brands/create', {categories: categories});
        });
      
});



router.post('/create', (req, res)=>{


    let logoName = '';

    if(!isEmpty(req.files)){

    let logo = req.files.logo;
    logoName = Date.now() + '_' + logo.name;

    logo.mv(uploadDirBrands + logoName, (err)=>{
            if(err) throw err;

    const newBrand = new Brand({
        name: req.body.name,
        category:  req.body.category,
        status: req.body.status,
        logo: logoName,
    });
        newBrand.save().then(addBrand=>{

            res.redirect('/admin/brands');
        });
    


        });
    }else{
        console.log('Select Logo Please');
    }

});


router.get('/edit/:id', (req, res)=>{

    Brand.findOne({_id: req.params.id}).lean().then(brand=>{

        Category.find({}).lean().then(categories=>{

            res.render('admin/brands/edit', {brand: brand, categories: categories});
        }); 
    });
});


router.put('/edit/:id', (req, res)=>{

    Brand.findOne({_id: req.params.id}).then(brand=>{

        brand.name = req.body.name;
        brand.category = req.body.category;
        brand.status = req.body.status;
        
        brand.save().then(updateBrand=>{
            // req.flash('success_message', 'Category was Successfully Updated.');
            res.redirect('/admin/brands');
        });
    });
});


router.delete('/:id', (req, res)=>{

    Brand.findOne({_id: req.params.id}).then(brand=>{

        fs.unlink(uploadDirBrands + brand.logo, (err)=>{

        
            brand.remove().then(deleteBrand=>{
                // req.flash('success_message', 'Brand was Successfully deleted.');
                res.redirect('/admin/brands');
            });
           

            
     });
        
    });

});

module.exports = router;