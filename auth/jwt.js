

const jwt = require('jwt-simple');
const config = require ('../config');

/**
 * Create JWT 
 * @param user.id 
 */
exports.createToken = (user) => {
  console.log("Create token...");
  const time = new Date().getTime(); 
  let token = jwt.encode({
    sub: user.id,
    iat: time 
  }, config.secret);

  return token;
}