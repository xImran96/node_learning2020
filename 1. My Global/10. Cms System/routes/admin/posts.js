const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { post } = require('../home');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const e = require('express');
const { logger } = require('handlebars');
const fs = require('fs');
const passport = require('passport');
const {userAuthenticated} = require('../../helpers/auth');

router.all('/*', userAuthenticated, (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();

});


router.get('/', (req, res)=>{

    Post.find().populate('category').lean().then(posts=>{
    res.render('admin/posts/index', {posts: posts});
    });

});


router.get('/create', (req, res)=>{

    Category.find().lean().then(categories=>{
    res.render('admin/posts/create', {categories: categories});
    });
});

router.post('/create', (req, res)=>{



    // let errors = [];

    // if (!req.body.title) {
    //     errors.push({errorMessage: 'Please enter title.'});
    // }

    // if (!req.body.body) {
    //     errors.push({errorMessage: 'Please enter description.'});
    // }

    // if (errors.length > 0) {
    //     res.render('admin/posts/create', {errors: errors});
    // }else{

    
                

                let allowComments = true;
                if(req.body.allowComments){
                    allowComments = true;
                }else{
                    allowComments = false;
                }

                let filename = '';

                if(!isEmpty(req.files)){

                let file = req.files.file;
                filename = Date.now() + '_' + file.name;

                file.mv('./public/uploads/' + filename, (err)=>{
                        if(err) throw err;



                const newPost = new Post({
                    title: req.body.title,
                    category: req.body.category,
                    status: req.body.status,
                    allowComments: allowComments,
                    body: req.body.body,
                    file: filename
                });


                newPost.save().then(savePost => {

                           req.flash('success_message', 'Post added Successfully deleted.');
                           res.redirect('/admin/posts');

                    }).catch(validator=>{
                     
                           // res.render('admin/posts/create', {errors: validator.errors});

                    console.log(validator.errors);
                });
                    
                });
                //  console.log('Image is not empty');
                }
                // else{
                //     console.log('Image is empty');   
                // }


// }

});




router.get('/edit/:id', (req, res)=>{

    Post.findOne({_id: req.params.id}).lean().then(post=>{
        
        Category.find().lean().then(categories=>{
            res.render('admin/posts/edit', {post: post, categories: categories});
            });
        
    });


});

router.put('/edit/:id', (req, res)=>{

    Post.findOne({_id: req.params.id}).then(post=>{

        if(req.body.allowComments){
            allowComments = true;
        }else{
            allowComments = false;
        }

        post.title = req.body.title;
        post.category = req.body.category;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;

        post.save().then(updatePost=>{
            req.flash('success_message', 'Post was Successfully Updated.');
            res.redirect('/admin/posts');
        });
        
        
    });

});



router.delete('/:id', (req, res)=>{

    // Post.remove({_id: req.params.id}).then(deletePost=>{

    //     res.redirect('/admin/posts');

    // });

    
    Post.findOne({_id: req.params.id}).populate('comments').then(post=>{


        // console.log(post.comments)

        fs.unlink(uploadDir + post.file, (err)=>{

            if(!post.comments.length < 1){
                    post.comments.forEach(comment=>{
                        comment.remove();
                    });
            }
            post.remove().then(deletePost=>{
                req.flash('success_message', 'Post was Successfully deleted.');
                res.redirect('/admin/posts');
            });
           

            
     });
        
    });

});

module.exports = router;
