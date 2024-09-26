const { Router } = require('express');
const urlRouter = Router();
const {handelGenerateNewShortURL, handelGetAnalytics} = require('../controllers/url');

urlRouter.post('/', handelGenerateNewShortURL ,(req, res) => {
  res.json({message: 'Hello from URL router', });
}); 



urlRouter.get('/analytics/:shortId', handelGetAnalytics,  (req, res) => {
  res.json({message: 'Hello from URL router analytics', });
});






module.exports = {
  urlRouter
};  