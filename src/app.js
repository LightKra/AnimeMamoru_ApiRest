const express = require('express');
const app = express();
const dataPkg = require('../package.json');
const morgan = require('morgan');
const cors = require('cors');
const {seasonRouter} = require('./routes/season.routes');
const {movieRouter} = require('./routes/movie.routes');
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.get('/api', (req, res) => {
    res.json({
        "author": dataPkg.author,
        "description": dataPkg.description,
        "version": dataPkg.version
    });
});
app.use('/api/season',seasonRouter);
app.use('/api/movie',movieRouter);
module.exports = {app}