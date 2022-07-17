const mongooseSchema = require('mongoose');

const seasonSchema = new mongooseSchema.Schema({
  "title": String,
  "description": String,
  "Number_Episodes": Number,
  "date": String,
  "genres": [],
  "ratings": Number,
  "lenguages": [],
  "poster_path": String,
  "created": {
    "type": Date,
    "default": Date.now
  }
});
const season = mongooseSchema.model('season', seasonSchema);
module.exports = {
  season
};