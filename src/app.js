const express = require('express');
const app = express();
const dataPkg = require('../package.json');
const morgan = require('morgan');
const cors = require('cors');
const {seasonRouter} = require('./routes/season.routes');
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.json({
        "author": dataPkg.author,
        "description": dataPkg.description,
        "version": dataPkg.version
    });
});
app.use('/season',seasonRouter);
module.exports = {app}