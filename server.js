const express = require('express');
const routes = require('./server/routes');
const config = require('./config');
const PORT = process.env.PORT || config.PORT;
const app = express();

/** Mount routes(Load UI) */
app.use(routes);

console.log(`${config.APPNAME} listening on port ${PORT}`);
app.listen(PORT);