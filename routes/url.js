const { Router } = require('express');
const {handelGenerateNewShortURL, handelGetAnalytics} = require('../controllers/url');
const shortid = require('shortid');
const urlRouter = Router();

urlRouter.post('/', handelGenerateNewShortURL);


urlRouter.get('/analytics/:shortId', handelGetAnalytics);






module.exports = {
  urlRouter
};  