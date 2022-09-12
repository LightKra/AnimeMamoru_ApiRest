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
    "chapter number":{
        "type": Number,
        "default": 0
    },
    "description": String,
    "ratings": Number,
    "poster_path": {
        "type": String,
        "required": true
    },
    "url_play": {
        "option_1": String,
        "option_2": String,
        "option_3": String,
        "option_4": String
    },
    "url_download":{
        "option_1": String,
        "option_2": String,
        "option_3": String,
        "option_4": String
    }
},{
    "timestamps": true,
    "versionKey": false
});
const episode = mongooseSchema.model('episode',episodeSchema);
module.exports = {episode}