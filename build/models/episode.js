const mongooseSchema = require('mongoose');

const episodeSchema = new mongooseSchema.Schema({
  "espisodeRef": {
    "type": mongooseSchema.Schema.Types.ObjectId,
    "ref": "season_ref"
  },
  "title": String,
  "description": String,
  "ratings": Number,
  "poster_path": String,
  "url_play": {
    "mega": String,
    "fembed": String,
    "ok_ru": String
  },
  "url_download": {
    "mega": String,
    "mediafire": String,
    "google_drive": String,
    "zippyshare": String,
    "icloud_drive": String
  },
  "created": {
    "type": Date,
    "default": Date.now
  }
});
const episode = mongooseSchema.model('episode', episodeSchema);
module.exports = {
  episode
};