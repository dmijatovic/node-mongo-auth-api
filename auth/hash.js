
const bcrypt = require('bcrypt-nodejs');

/**
 * Encrypt password using bcrypt
 * it returns promise that resolves with hased password
 * @param password:string 
 */
exports.hashPass = ( password ) => {
return new Promise((res, rej)=>{
  try{
    //generate salt
    bcrypt.genSalt(10,(err, salt)=>{
      //on error reject
      if (err) {rej(err)};
      //hash/encrypt password
      bcrypt.hash(password, salt, null, (err, hash)=>{
        if (err) {rej(err)};
        //save encrypted password
        //console.log("Hashed pass...", hash);
        //resolve with hased password
        res(hash);
      });
    });
  }catch (err) {
    rej(err);
  } 
});
}