const monsgoose = require('mongoose');

const urlSchema = new monsgoose.Schema({
  shortId: {type: String, required: true, unique: true},
  redirectUrl: {type: String, required: true},
  visitHistory: [{timestamp: {type: Date, default: Date.now}}],
}, 
{timestamps: true});



const URL = monsgoose.model('urls', urlSchema);


module.exports = {
  URL
};