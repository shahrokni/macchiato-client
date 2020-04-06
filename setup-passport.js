var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./model/user/user');

module.exports = function () {  
   
    passport.serializeUser(function (user, done) {       
       
        done(null, user._id);
    });

    passport.deserializeUser(function(id,done){
       
        User.findById(id,function(err,user){            
          
            done(err,user);
        });
    });
};

passport.use('login',new localStrategy(function(username,password,done){

   

    User.findOne({userName:username},function(err,user){

        if(err){         

            return done(err);
        }

        if(!user){           

            return done(null,false,{message:'The username has not been found!'});
        }

        user.checkPassword(password,function(err,isMatch){

            if(err){

                return done(err);
            }

            if(isMatch){              

                return done(null,user);
            }
            else{
              
                return done(null,false,{message:'Invalid password'});
            }
        });
    });
}));
