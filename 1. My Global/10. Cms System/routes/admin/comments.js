const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const User = require('../../models/User');
const Post = require('../../models/Post');




router.get('/', (req, res)=>{

     Comment.find({user: req.user._id}).populate('user').then(comments=>{
     res.render('admin/comments/index', {comments: comments});
     
     });
 
 });

router.post('/',(req, res)=>{
        
        Post.findOne({_id: req.body.id}).then(post=>{
           const postComment = new Comment({
                body: req.body.body,
                user: req.user._id
           });
           post.comments.push(postComment);
           post.save().then(savedPost=>{
               postComment.save().then(savedComment=>{
                    res.redirect(`/post/${post.id}`);
               });
           });
        });
});



router.delete('/:id', (req, res)=>{

     Comment.remove({_id: req.params.id}).then(deleteComment=>{

          Post.findOneAndUpdate({comments: req.params.id}, {$pull: {comments: req.params.id}}, (err, data)=>{

               if(err) console.log(err);

               req.flash('success_message', 'Comment was Successfully Deleted.');
               res.redirect('/admin/comments');
          });


 
     });
 });
 
 module.exports = router;


module.exports = router; 