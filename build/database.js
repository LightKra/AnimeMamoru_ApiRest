'use strict';

const urlConnection = process.env.URL_CONNECT;

const mongoose = require('mongoose');

console.log(urlConnection);
mongoose.connect('mongodb://' + urlConnection).then(promise => {
  console.log("connected database");
}).catch(error => console.log("connected error: " + error));
module.exports = {
  mongoose
};