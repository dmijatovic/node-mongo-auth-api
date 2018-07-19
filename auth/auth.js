/*
 * Authentication API using mongodb
 * Dusan Mijatovic
 * v.0.0.1 June 2018 
 */

const User = require('../mongo/model/user');
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
      msg: "OK" 
    });
  });
}