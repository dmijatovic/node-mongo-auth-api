
/**
 * Passport module using passport.js
 * We use passport strategy to verify user using JWT
 */
const Passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const localStrategy = require ('passport-local').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const User = require('../mongo/model/user');
const config = require('../config');
const encrypt = require('./hash');
/**
 * Create local strategy (email & password) authentication
 * When user logs in we need to autheticate with email & pass
 * after that we provider user with JWT to be used on api calls
 */

const localOptions={
  usernameField: 'email'
}

const localLogin = new localStrategy(localOptions,(email, password, next)=>{
  //verify username & pass
  console.log("Passport strategy...checking login");
  //find user by email 
  User.findOne({email: email}).then((user)=>{
    console.log("user found...")
    //user found
    if (user){
      //debugger
      //user found compare passwords using bcrypt
      user.comparePassword(password,(err, isMatch)=>{
        if(err) {next(err)};
        // password match
        if (isMatch){
          console.log("password valid...", isMatch);
          next(null, user);
        }else{
          //passwords not match
          next (null, false);
        }
      });
    }else{
      //no error but no user either!
      next(null,false);
    }
  }).catch((e)=>{
    //error
    next(err);
  });
});


//setup options for JWT strategy
const jwtOptions = {
  //extract from Authorization header as bearer token
  jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
  //use secret for decoding
  secretOrKey: config.secret
};

/**
 * create JWT strategy 
 * pass options and callback function 
 * payload is decoded JWT payload
 * next is middleware / callback function  
 */
const jwtLogin = new jwtStrategy(jwtOptions, (payload, next)=>{
  console.log("Passport startegy...checking jwt");
  //find user based on payload.sub (user.id)
  User.findById(payload.sub)
  .then((user)=>{
    if (user){
      //call next with null error and user object
      console.log("User found...")
      next(null, user);
    }else{
      //user not found but no error
      //we need to return false to passport
      //as second parameter
      next(null, false);
    }
  }).catch((e)=>{
    //call next with error;
    next(err, null);
  });
})

//use created strategy by passport library
Passport.use(jwtLogin);
Passport.use(localLogin);
