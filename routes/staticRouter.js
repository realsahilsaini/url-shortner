const express = require('express');
const {URL} = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

const staticRouter = express.Router();

staticRouter.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res)=>{

  const allUrls = await URL.find({});

  res.render('home', {
    urls: allUrls,
  });
});

staticRouter.get('/', restrictTo(["NORMAL", "ADMIN"]) ,async (req, res)=>{
  
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