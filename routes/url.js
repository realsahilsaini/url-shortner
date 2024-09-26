const { Router } = require('express');
const {handelGenerateNewShortURL, handelGetAnalytics} = require('../controllers/url');
const shortid = require('shortid');
const urlRouter = Router();

urlRouter.post('/', handelGenerateNewShortURL ,(req, res) => {
  res.json({message: 'Hello from URL router', shortid: id});
}); 



urlRouter.get('/analytics/:shortId', handelGetAnalytics,  (req, res) => {
  res.json({message: 'Hello from URL router analytics', });
});






module.exports = {
  urlRouter
};  