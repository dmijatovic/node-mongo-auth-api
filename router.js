/**
 * API router
 * 
 * v.0.0.1 July 2018
 */
const Auth = require ('./auth/auth');

module.exports = (api) =>{

  api.get("/",(req, res)=>{
    res.send("I am OK");
  });

  api.post("/signup", Auth.signup);

}