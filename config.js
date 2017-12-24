const url = 'mongodb://localhost:27017';
const dbName = 'flickr-iesa';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

module.exports = {
    connectDatabase: function() {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            client.close();
        });
    }
};