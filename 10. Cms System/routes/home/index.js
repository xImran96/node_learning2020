const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'home';
    next();
});


router.get('/', (req, res)=>{

    Post.find().populate('user').lean().then(posts=>{

        Category.find({}).lean().then(categories=>{

            res.render('home/index', {posts: posts, categories: categories});
           
            });
        
        });
    
});



router.get('/post/:id', (req, res)=>{

 
        Post.findOne({_id: req.params.id}).
        populate({path: 'comments', match:{approveComment: true}, populate: {path: 'user', model: 'users'}}).
        populate('user')
        .lean().then(post=>{

            
        Category.find({}).lean().then(categories=>{

            res.render('home/post', {post: post, categories: categories});
           
            });
            
        });
    
    
});

router.get('/session', (req, res)=>{
    req.session.imran = 'M.Imran';
    if (req.session.imran) {
    	console.log(`we found ${req.session.imran}`)
    }
});


router.get('/about', (req, res)=>{
    res.render('home/about');
});



router.get('/login', (req, res)=>{
    res.render('home/login');
});

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: "/admin",
        failureRedirect:"/login",
        failureFlash: true
    })(req, res, next);
});

// APP LOGIN

passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user){
            return done(null, false, {message: "Incorrect Email"});
        }
        bcrypt.compare(password, user.password, (err, matched)=>{

            if(err){
                return err;
            }
            if(matched){
                return done(null, user);
            }else{
                return done(null, false, {message: "Incorrect Password"});
            }


        });
    });
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


router.get('/logout', (req, res, next)=>{
    
    req.logOut();
    res.redirect('/login')
   
});



router.get('/register', (req, res)=>{
    res.render('home/register');
});



router.post('/register', (req, res)=>{

    let errors=[];

    if (!req.body.firstName) {
        errors.push({'message': 'First Name Required.'});
    }

    if (!req.body.lastName) {
        errors.push({'message': 'Last Name Required.'});
    }

    if (!req.body.email) {
        errors.push({'message': ' Email Required.'});
    }

    if (!req.body.password) {
        errors.push({'message': 'Password Required.'});
    }

    if (!req.body.passwordConfirm) {
        errors.push({'message': 'Confrim Password is Required.'});
    }

    if (req.body.password != req.body.passwordConfirm) {
        errors.push({'message': 'Password not Matched.'});
    }

    if (errors.length > 0) {

        res.render('home/register', {
        errors:errors,
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email    : req.body.email,
        password : req.body.password,
        });

    }else{


        User.findOne({email: req.body.email}).then(user=>{

            if (!user) {

                    const newUser = new User({
                        firstName: req.body.firstName,
                        lastName : req.body.lastName,
                        email    : req.body.email,
                        password : req.body.password,
                    });

                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{

                                newUser.password = hash;
                           
                                  newUser.save().then(savedUser=>{
                                    req.flash('success_message', 'You are now registered. Please login now');
                                      res.redirect("/login");
                             });

                        });
                    });

            }else{

                 req.flash('err_message', 'Email Already Exist');
                                      res.redirect("/register");

            }

        });



  

        }

});
module.exports = router;