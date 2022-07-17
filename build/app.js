const express = require('express');

const app = express();

const dataPkg = require('../package.json');

const user = require('./models/user');

app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.json({
    "author": dataPkg.author,
    "description": dataPkg.description,
    "version": dataPkg.version
  });
});
console.log(user);
module.exports = {
  app
};