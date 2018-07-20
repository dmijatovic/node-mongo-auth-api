/**
 * API router
 * 
 * v.0.0.1 July 2018
 */
const Auth = require ('./auth/auth');
const passSvc = require('./auth/passport');
const passport = require('passport');

//create authenticate middleware, 
//using passport jwt strategy, 
//no session support (cookies session use by passport)
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false}); 

module.exports = (api) =>{

  api.get("/", requireAuth, (req, res)=>{
    res.send("I am OK");
  });

  api.post("/signup", Auth.signup);

  api.post("/signin", requireSignin, Auth.sigin);

  api.get('/users', requireAuth, (req, res)=>{
    res.send("You are OK! Authorized!");
  });
}