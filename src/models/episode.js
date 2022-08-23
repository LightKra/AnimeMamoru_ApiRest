const mongooseSchema = require('mongoose');
const episodeSchema = new mongooseSchema.Schema({
    "season_ref": {
        "type": mongooseSchema.Schema.Types.ObjectId,
        "ref": "season"
    },
    "title": {
        "type": String,
        "required": true
    },
    "description": String,
    "ratings": Number,
    "poster_path": {
        "type": String,
        "required": true
    },
    "url_play": {
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
    "versionKey": false
});
const episode = mongooseSchema.model('episode',episodeSchema);
module.exports = {episode}