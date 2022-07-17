const mongooseSchema = require('mongoose');
const seasonSchema = new mongooseSchema.Schema({
    "title": {
        "type": String,
        "required": true
    },
    "description": String,
    "number_episodes": Number,
    "date": String,
    "genres": [],
    "ratings": Number,
    "lenguages": [],
    "poster_path": {
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