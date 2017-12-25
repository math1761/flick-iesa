const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const search = require('./modules/search');
const databaseConfig = require('./config');
const path = require('path');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
databaseConfig.connectDatabase();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/', (req, res) => {

    /*const cache = new Images({
        tag: req.body.tag
    });*/

    search.searchFlickr(req.body.tag, res);

    /*else {
        cache.findOne({ 'tag': req.body.tag })
            .exec(function (err, tag_found) {
                if (err) { return next(err); }
                else if (tag_found) {
                    for (i = 0; i < tag_found.length; i++) {
                        res.write("<img src='" + req.body.tag + "'/>")
                        res.end();
                    }
                }
            })
    }*/
});

app.listen(3000, () => console.log('Listening on port 3000!'));
