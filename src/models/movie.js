const mongooseSchema = require('mongoose');
const movieSchema = new mongooseSchema.Schema({
    "title":{
        "type": String,
        "required": true
    },
    "description":{
        "type": String,
        "required": true
    },
    "year": {
        "type": String,
        "required": true
    },
    "genres": {
        "type": Array,
        "required": true
    },
    "ratings": {
        "type": Number,
        "default": 0
    },
    "lenguages": {
        "type": Array,
        "required": true
    },
    "page":{
        "type": Number,
        "default": 0
    },
    "poster_path": {
        "type": String,
        "required": true
    },
    "landScapePoster_path": {
        "type": String,
        "required": true
    },
    "url_play":{
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
    "versionkey": false
});
const movie = mongooseSchema.model('movie', movieSchema);
module.exports = {movie}