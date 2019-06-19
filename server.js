const express = require('express');
const routes = require('./app/routes');
const config = require('./config');

const app = express();

/** Mount routes */
app.use(routes);

console.log(`${config.APPNAME} listening on port ${config.PORT}`);
app.listen(config.PORT);