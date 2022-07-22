const mongooseSchema = require('mongoose');
const movieSchema = new mongooseSchema.Schema({
    "title":{
        "type": String,
        "required": true
    },
    "description": String,
    "date": String,
    "genres": [],
    "ratings": Number,
    "lenguages": [],
    "poster_path": {
        "type": String,
        "required": true
    },
    "url_play":{
        "mega": String,
        "fembed": String,
        "ok_ru": String
    },
    "url_download":{
        "mega": String,
        "mediafire": String,
        "google_drive": String,
        "zippyshare": String,
        "icloud_drive": String
    }
},{
    "timestamps": true,
    "versionkey": false
});
const movie = mongooseSchema.model('movie', movieSchema);
module.exports = {movie}