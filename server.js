const express = require('express');
const routes = require('./server/routes');
const config = require('./config');
const PORT = process.env.PORT || config.PORT;
const app = express();


/** Fetch file from server and store in local-memory */
require('./server/actions/fileOperations').readFile(config.FILEPATH)
    .then(() => {
        /** Mount routes(Load UI) */
        app.use(routes);

        console.log(`${config.APPNAME} listening on port ${PORT}`);
        app.listen(PORT);
    })
    .catch(error => console.log('Error fetching text file:-', error));