const express = require('express');
const {URL} = require('../models/url');

const staticRouter = express.Router();

staticRouter.get('/', async (req, res)=>{


  //If no req.user, from checkAuth() middleweware, redirect to signin page
  if(!req.user) {
    return res.redirect('/user/signin');
  }
  
  const userUrls = await URL.find({createdBy: req.user._id});

  res.render('home', {
    urls: userUrls,
  });
})


staticRouter.get('/user/signup', async (req, res)=>{
 res.render('signup');
});

staticRouter.get('/user/signin', async (req, res)=>{
 res.render('signin');
}); 

module.exports = {  
 staticRouter
};