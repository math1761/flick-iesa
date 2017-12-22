const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const search = require('./modules/search');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'flickr-iesa'

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});


app.use(express.static('front'));


app.get('/', (req, res) => {
    /*console.log('test')
    search.searchFlickr('dogs', res);*/
    res.send('./front/index.html')
});

app.listen(3000, () => console.log('Listening on port 3000!'));
