const express = require('express');
const {urlRouter} = require('./routes/url');
const {URL} = require('./models/url');
const {connectToMongoDB} = require('./connect');
require("dotenv").config();
const app = express();


connectToMongoDB(process.env.MONGO_URI);

app.use(express.json());

app.use('/url', urlRouter);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const url = await URL.findOneAndUpdate({shortId}, {
        $push:{
            visitHistory: {timestamp: Date.now()}
        }
    });


    console.log(url);

    if(!url) {
        return res.status(404).json({error: 'URL not found'});
    }

    res.redirect(url.redirectUrl);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});