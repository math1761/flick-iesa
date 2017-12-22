let Flickr = require('node-flickr');

flickr = new Flickr({
    api_key: "10f0db070e0069eeb6fc3b423ab58510",
    secret: "548208b2e7877737"
});

module.exports = {

    searchFlickr: function(tag, result) {
        console.log('test')
        flickr.get('photos.search', {"tags": tag}, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                result.end(res.photos.photo)
            }
        })
    }
};