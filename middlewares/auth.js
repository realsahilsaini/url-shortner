const { getUser } = require("../service/auth");


function checkAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) {
    return next();
  }

  //At this point I have Aurthorization header
  const token = tokenCookie;
  const user = getUser(token);
  
  req.user = user;
  return next();
}


function restrictTo(roles =[]){
  return function(req, res, next) {
    if(!req.user){
      return res.redirect("/user/signin");
    }

    if(!roles.includes(req.user.role)){
      return res.end("You are not authorized to access this page");
    }

    return next();
  }
}


// async function restrictToLoggedinUserOnly(req, res, next) {

//   const userUid = req.headers["authorization"];

//   if (!userUid) {
//     return res.redirect("/user/signin");
//   }

//   const token = userUid.split(" ")[1];

//   const user = getUser(token);

//   if (!user) {
//     return res.redirect("/user/signin");
//   }

//   req.user = user;

//   next();
// }

//this works by checking if the user has a cookie with the uid and if the user is in the database or not 
// async function checkAuth(req, res, next) {

//   const userUid = req.headers["authorization"];
//   const token = userUid.split(" ")[1];

//   const user = getUser(token);

//   req.user = user;
//   next();

// }


module.exports = {
  checkAuthentication,
  restrictTo
};