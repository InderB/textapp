const express = require('express');
const routes = require('./app/routes');
const config = require('./config');
const PORT = process.env.PORT || config.PORT;
const app = express();

/** Mount routes */
app.use(routes);

console.log(`${config.APPNAME} listening on port ${PORT}`);
app.listen(PORT);