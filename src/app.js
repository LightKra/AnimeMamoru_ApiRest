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
app.on('unhandledRejection', (err) => {
    console.error(`Error Name : ${err.name}\nError Message : ${err.message}`);
    console.error(`unhandledRejection!💥 Shutting Down...`);
      process.exit(1); // 0 for success & 1 for uncaught exeptions
  });
app.on('uncaughtException', err => {
    console.log('uncaughtException!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });  
app.use('/api/season',seasonRouter);
app.use('/api/movie',movieRouter);
app.use('/api/episode',episodeRouter);
app.use('/api/user', userRouter);
// this is default in case of unmatched routes
app.use(function(req, res) {
  // Invalid request
        res.json({
          error: {
            'name':'Error',
            'status':404,
            'message':'Invalid Request',
            'statusCode':404,
            'stack':'http://animeMamoru/'
          },
           message: 'Testing!'
        });
  });
  
module.exports = {app}