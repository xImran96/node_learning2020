const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const {userAuthenticated} = require('../../helpers/auth');



router.all('/*', userAuthenticated, (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();

});



router.get('/', (req, res)=>{

	
        Category.find({}).lean().then(categories=>{
            res.render('admin/categories/index', {categories: categories});
            });
});

router.post('/create', (req, res)=>{

    const newCategory = new Category({
            name: req.body.name
    });

    newCategory.save().then(saveDCategory=>{

        req.flash('success_message', 'Category added Successfully.');
        res.redirect('/admin/categories');

    });
    

});


router.get('/edit/:id', (req, res)=>{

    Category.findOne({_id: req.params.id}).lean().then(category=>{

        res.render('admin/categories/edit', {category: category});
    });


});



router.put('/edit/:id', (req, res)=>{

    Category.findOne({_id: req.params.id}).then(category=>{

        category.name = req.body.name;
 
        category.save().then(updateCategory=>{
            req.flash('success_message', 'Category was Successfully Updated.');
            res.redirect('/admin/categories');
        });
        
        
    });

});



router.delete('/:id', (req, res)=>{

    Category.remove({_id: req.params.id}).then(deleteCategory=>{
        req.flash('success_message', 'Category was Successfully Deleted.');
        res.redirect('/admin/categories');

    });
});

module.exports = router;