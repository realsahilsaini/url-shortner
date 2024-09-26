const express = require('express');
const {urlRouter} = require('./routes/url');
const {URL} = require('./models/url');
const {staticRouter} = require('./routes/staticRouter');
const {connectToMongoDB} = require('./connect');
require("dotenv").config();
const app = express();


connectToMongoDB(process.env.MONGO_URI);

app.use(express.json());

//Middleware to parse the body of the form data
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use('/url', urlRouter);

app.use('/', staticRouter);

// app.get('/all-urls', async (req, res) => {
//     //Gives array of all urls documents in the database
//     const allUrls = await URL.find({});

//     //Client side rendering
//     // return res.end(`
//     // <html>
//     //     <body>
//     //         <h1>All URLs</h1>
//     //         <ul>
//     //             ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectUrl} - ${url.visitHistory.length}</li>`).join('')}
//     //         </ul>
//     //     </body>
//     // </html>
//     // `);

//     //Server side rendering
    
//     //Server side rendering
//     return res.render('home', {
//         urls: allUrls,
//     });
// });



//Redirect to the original URL when the shortId is accessed

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const url = await URL.findOneAndUpdate({shortId}, {
        $push:{
            visitHistory: {timestamp: Date.now()}
        }
    });

    if(!url) {
        return res.status(404).json({error: 'URL not found'});
    }

    res.redirect(url.redirectUrl);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});