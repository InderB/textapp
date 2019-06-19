const app = module.exports = require('express')();
const path = require('path');
const express = require('express');
const config = require('./../config');
const frequencyCount = require('./actions/frequencyCounter').frequencyCount;

// Serve only the static files form the dist directory
app.use(express.static(`${__dirname}/../dist/${config.APPNAME}`));
app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../dist/${config.APPNAME}/index.html`));
});

app.get('/api/getFrequency/:wordCount', (req, res) => {
    frequencyCount(req.params.wordCount)
        .then(data => res.send({ success: true, data }))
        .catch(error => res.send({ success: false, errors: [error] }));
});