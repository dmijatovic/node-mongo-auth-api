
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt-nodejs');
const encrypt = require('../../auth/hash');

//define use model
const userSchema = new Schema({
  email:{
    type: String,
    unique: true,
    lowercase: true 
  },
  password: String 
});

/**
 * mongoDB custom function on Save Hook, 
 * Encrypt password using bcrypt
 * note! we need to use function keywoard to 
 * get user object from this context 
 * DO NOT USE arrow function (you know why!)
 */
userSchema.pre('save', function (next){
  //use function to have this context
  //to be a instace of a user model
  //note! do not use arrow fn
  const user = this;

  //encrypt the password before saving
  encrypt.hashPass(user.password)
  .then((hash)=>{
    console.log("Hashed pass...", hash);
    user.password = hash;
    next(); 
  },(err)=>{
    //return error
    return next(err);
  });
});


//create model class
const userModel = mongoose.model('user',userSchema);

//export model class
module.exports = userModel;