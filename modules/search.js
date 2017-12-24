const Flickr = require('flickr-sdk');
const path = require('path');
const img_path = path.join(__dirname, '/public/images');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
flickr = new Flickr("10f0db070e0069eeb6fc3b423ab58510");

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
            for (i = 0; i < 4; i++) {
                result.write("<img src='https://farm" + res.body.photos.photo[i].farm + ".staticflickr.com/" + res.body.photos.photo[i].server + "/" + res.body.photos.photo[i].id + "_" + res.body.photos.photo[i].secret + ".jpg" + "'/>")
            }
            result.end();
        }).catch(function (err) {
            console.error(err);
        });
    }


};