//basically a dairy to store the user session id and user object
const jwt = require('jsonwebtoken');



function setUser (user) {

  return jwt.sign({
    _id: user._id,
    username: user.username
  }, process.env.JWT_SECRET);

}

function getUser (token) {

  if(!token) return null;

  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  setUser,
  getUser
}