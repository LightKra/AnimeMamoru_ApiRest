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