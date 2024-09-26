const shortid = require('shortid');
const {URL} = require('../models/url');

async function handelGenerateNewShortURL(req, res) {


  if(!req.body.url) {
    return res.status(400).json({ error: 'Url is required' });
  }

  const shortId = shortid();

  await URL.create({
    shortId,
    redirectUrl: req.body.url,
    visitHistory: [],
  });


  res.json({ id: shortId });
}




async function handelGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const url = await URL.findOne({shortId});

  if(!url) {
    return res.status(404).json({error: 'URL not found'});
  }

  res.json({totalClicks: url.visitHistory.length, visitHidtory: url.visitHistory});


}


module.exports = {
  handelGenerateNewShortURL,
  handelGetAnalytics
};