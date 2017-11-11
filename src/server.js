/*
  This file is the main entry point for the application.
  Use this file to configure all infratructure things like:
  NewRelic / Prometheus.io etc
*/

const config = require('config');
const apiServer = require('./app');

const PORT = config.get('port');

apiServer.listen(
  PORT,
  () => console.info(`${config.get('appName')} started on http://locahost:${PORT}`), // eslint-disable-line no-console
);
