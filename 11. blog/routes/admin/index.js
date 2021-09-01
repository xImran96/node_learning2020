const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../../helpers/AuthAdmin');
const { isAdmin } = require('../../helpers/isAdmin');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

router.all('/*', (req, res, next)=>{

    req.app.locals.layout = 'admin';
    next();

});



router.get('/', [isAuthenticated, isAdmin], (req, res)=>{

           res.render('admin/index');
             
});

router.get('/login', (req, res)=>{

    res.render('admin/login');
      
});



router.post('/adminlogin', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: "/admin",
        failureRedirect:"/admin/login",
        failureFlash: true
    })(req, res, next);
});

// APP LOGIN

passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user){
            return done(null, false, {message: "Incorrect Email"});
        }
        // if(user.isAdmin == 1){
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




module.exports = router;