const express = require('express');
const app = express();
const dataPkg = require('../package.json');
const morgan = require('morgan');
const cors = require('cors');
const {createRoles} = require('./libs/initialSetup');
const {seasonRouter} = require('./routes/season.routes');
const {movieRouter} = require('./routes/movie.routes');
const {episodeRouter} = require('./routes/episode.routes');
const {userRouter} = require('./routes/user.routes');
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
createRoles();
app.use('/api/season',seasonRouter);
app.use('/api/movie',movieRouter);
app.use('/api/episode',episodeRouter);
app.use('/api/user', userRouter);
module.exports = {app}