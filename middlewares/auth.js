const { getUser } = require("../service/auth");



async function restrictToLoggedinUserOnly(req, res, next) {

  const userUid = req.headers["authorization"];

  if (!userUid) {
    return res.redirect("/user/signin");
  }

  const token = userUid.split(" ")[1];

  const user = getUser(token);

  if (!user) {
    return res.redirect("/user/signin");
  }

  req.user = user;

  next();
}

//this works by checking if the user has a cookie with the uid and if the user is in the database or not 
async function checkAuth(req, res, next) {

  const userUid = req.headers["authorization"];
  const token = userUid.split(" ")[1];

  const user = getUser(token);

  req.user = user;
  next();

}


module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth
};