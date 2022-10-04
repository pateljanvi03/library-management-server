const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(5001, () => logger.info(`server started on port ${5001} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
