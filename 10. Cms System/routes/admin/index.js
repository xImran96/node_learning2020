const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const Comment = require('../../models/Comment');
const {userAuthenticated} = require('../../helpers/auth');
 
router.all('/*', userAuthenticated, (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();

});


router.get('/', (req, res)=>{

    Post.count({user: req.user._id}).then(postCount=>{

        Comment.count({user: req.user._id}).then(commentCount=>{

            Category.count().then(categoryCount=>{

                res.render('admin/index', {postCount: postCount, commentCount: commentCount, categoryCount: categoryCount});

            });

        });
        
    });
});





module.exports = router;
