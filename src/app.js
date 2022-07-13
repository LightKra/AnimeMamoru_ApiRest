const express = require('express');
const app = express();
const dataPkg = require('../package.json');

app.get('/', (req, res) => {
    res.json({
        "author": dataPkg.author,
        "description": dataPkg.description,
        "version": dataPkg.version
    });
});

module.exports = {app}