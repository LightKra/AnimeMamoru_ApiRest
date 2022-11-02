const express = require('express');
const app = express();
const dataPkg = require('../package.json');
const morgan = require('morgan');
const cors = require('cors');
const {createRoles,createDefaultRoot} = require('./libs/initialSetup');
const {seasonRouter} = require('./routes/season.routes');
const {movieRouter} = require('./routes/movie.routes');
const {episodeRouter} = require('./routes/episode.routes');
const {userRouter} = require('./routes/user.routes');
const {logError, isOperationalError} = require('./middlewares/error/errorHandler');
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
createDefaultRoot();

app.use('/api/season',seasonRouter);
app.use('/api/movie',movieRouter);
app.use('/api/episode',episodeRouter);
app.use('/api/user', userRouter);
// this is default in case of unmatched routes
app.use(function(req, res) {
  res.json({
    "Error": "404"
  })
});
process.on('uncaughtException', error=>{
  logError(error);
  if(!isOperationalError(error)){
    process.exit(1);
  }
});
process.on('unhandledRejection', error=>{
  throw error;
})
module.exports = {app}