const express = require('express');
const userRouter = express.Router();
const { handelUserSignup, handelUserSignin } = require('../controllers/user');


userRouter.post("/signup", handelUserSignup);
userRouter.post("/signin", handelUserSignin);


module.exports = {
  userRouter
};

