const Flickr = require('flickr-sdk');
const path = require('path');
const img_path = path.join(__dirname, '/public/images');
flickr = new Flickr("10f0db070e0069eeb6fc3b423ab58510");
const db = require('../config')
const url = 'mongodb://localhost:27017';
const dbName = 'flickr-iesa';
const MongoClient = require('mongodb').MongoClient;

module.exports = {

    /**
     * Permet de rechercher les images dans la base flickr
     * @param tag
     * @param result
     */
    searchFlickr: function (tag, result) {
        flickr.photos.search({
            text: tag
        }).then(function (res) {
            if (tag != null) {
                for (i = 0; i < 30; i++) {
                    result.write("<div class='grid-item'>" +
                        "<img src='https://farm" + res.body.photos.photo[i].farm + ".staticflickr.com/" +
                        res.body.photos.photo[i].server + "/" + res.body.photos.photo[i].id + "_" +
                        res.body.photos.photo[i].secret + ".jpg" + "'/>" + "</div>")
                }
                result.end();
            }
        }).catch(function (err) {
            MongoClient.connect(url, function (err, client) {
                if (err) throw err;
                const db = client.db(dbName);
                db.collection("Tags").find({}).toArray(function (err, resultdb) {
                    if (err) throw err;
                    result.write("<img class='img_error' src='" + resultdb[0].tag.image1 + "'/>")
                    result.end();
                });
            });
        });
    }


};