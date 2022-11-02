const mongooseSchema = require('mongoose');
const seasonSchema = new mongooseSchema.Schema({
    "title": {
        "type": String,
        "required": true
    },
    "description": {
        "type": String,
        "required": true
    },
    "number_episodes": Number,
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
    "created": {
        "type": Date,
        "default": Date.now
    }
},{
    "timestamps": true,
    "versionKey": false
});
const season = mongooseSchema.model('season',seasonSchema);
module.exports = {season}