module.exports = {
    isAdmin: (req, res, next) =>{
        if(req.user.isAdmin){

           return next();
        }else{
            res.status(403).send();
        }
    }
}