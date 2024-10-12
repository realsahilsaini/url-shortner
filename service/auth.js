//Here we sign the user with jwt and set the cookie with the token
const jwt = require('jsonwebtoken');



function setUser (user) {

  //This gives token to the user
  return jwt.sign({
    _id: user._id,
    username: user.username,
    role: user.role
  }, process.env.JWT_SECRET);

}

function getUser (token) {

  if(!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  } 
}

module.exports = {
  setUser,
  getUser
}