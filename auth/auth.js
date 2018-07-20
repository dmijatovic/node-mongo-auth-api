/*
 * Authentication API using mongodb
 * Dusan Mijatovic
 * v.0.0.1 June 2018 
 */

const User = require('../mongo/model/user');
const jwt = require('./jwt');
/**
 * Signup - create new user
 * POST request
 * JSON object with props:
 * @param email: string,
 * @param password: string
 */
exports.signup = (req, res, next) => {
  //console.log(req.body);
  const email = req.body.email,
    pass = req.body.password;
  //res.send(`So you want to signup ${email}?`);
  //check parameters
  if (!email || !pass){
    return res.status(422).send({
      status: 422,
      msg: "POST JSON with email and password"
    });
  }

  //check if user exist
  User.findOne({email: email},(err,result)=>{
    //return error to next function
    if (err) { return next(err) };
    //if user with email exists
    if (result){
      return res.status(422).send({
        status: 422,
        msg:`Email already used: ${email}`
      });
    }
  });

  //user does not exist
  //create new user
  const user = new User({
    email: email,
    password: pass 
  });
  //save new record to db
  user.save((err)=>{
    if (err){return next(err)};
    //save completed
    //send info back
    res.json({
      status: 200,
      token: jwt.createToken(user)
    });
  });
}


/**
 * Signin route
 * Login check already takes place in the middleware using passport.js
 * If users reach this function he/she already has proper username and pass
 * found in mongodb. See passport localLogin strategy. Using passport middleware
 * we pass user model into request body.
 * @param {*} req.user: object passed by passport (localLogin strategy) 
 * @param {*} res 
 * @param {*} next 
 */
exports.sigin = (req, res, next) => {
  //res.send("You are signed in!");
  res.json({
    status: 200,
    token: jwt.createToken(req.user)
  });
}
