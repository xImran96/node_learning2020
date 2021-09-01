const express = require('express');
const Brand = require('../../models/Brand');
const router = express.Router();
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy= require('passport-remember-me').Strategy;
const {isAuthenticated} = require('../../helpers/Auth');

router.all('/*', (req, res, next)=>{

    req.app.locals.layout = 'main';
    next();

});



router.get('/', (req, res)=>{

    Category.find({status: 1}).lean().then(categories=>{
        Product.find({}).populate('images').lean().then(products=>{
            res.render('home/index', {products: products, categories: categories});
        });
    });             
});

router.get('/category/:id', (req, res)=>{

    Category.find({status: 1}).lean().then(categories=>{
        Brand.find({category: req.params.id}).lean().then(brands=>{
            res.render('home/category', {categories: categories, brands: brands});
        });
     });           
});

router.get('/category/:category/brand/:id', (req, res)=>{

Product.find({category: req.params.category, brand: req.params.id}).populate('images').lean().then(products=>{

        Category.find({status: 1}).lean().then(categories=>{

        res.render('home/brand', {products: products, categories: categories});

        });
    
    });

});

router.get('/product/:id', (req, res)=>{

    Product.findOne({_id: req.params.id}).populate('brand').populate('category').populate('images').lean().then(product=>{
        
            Category.find({status: 1}).lean().then(categories=>{
    
            res.render('home/product', {product: product, categories: categories});
    
            });
        
        });
    
    });

router.get('/login', (req, res)=>{

           res.render('home/login');
             
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
                         isAdmin : 0,
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


router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: "/",
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
        // if(user.isAdmin == 0){
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
    // }else{
    //     return done(null, false, {message: "Invalid User."});
    // }
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

  passport.use(new RememberMeStrategy(
    function(token, done) {
      Token.consume(token, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    },
    function(user, done) {
      var token = utils.generateToken(64);
      Token.save(token, { userId: user.id }, function(err) {
        if (err) { return done(err); }
        return done(null, token);
      });
    }
  ));


router.get('/logout', (req, res, next)=>{
    
    req.logOut();
    res.redirect('/login')
   
});






module.exports = router;