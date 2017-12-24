const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const search = require('./modules/search');
const databaseConfig = require('./config');
const path = require('path');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
databaseConfig.connectDatabase();

app.get('/', function (req, res) {
    body('tag', 'Recherche obligatoire').isLength({ min: 1 }).trim();
    const errors = validationResult(req);
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/search', (req, res, next) => {
    res.sendFile(path.join(__dirname, './search.html'));
    const errors = validationResult(req);

    const cache = new Images({
        tag: req.body.tag
    });

    if (!body.isEmpty()) {
        search.searchFlickr(req.body.tag, res);
    }
    else {
        cache.findOne({ 'tag': req.body.tag })
            .exec(function (err, tag_found) {
                if (err) { return next(err); }
                if (tag_found) {
                    for (i = 0; i < tag_found.length; i++) {
                        res.write("<img src='" + req.body.tag + "'/>")
                        res.end();
                    }
                }
            })
    }
});

app.listen(3000, () => console.log('Listening on port 3000!'));
