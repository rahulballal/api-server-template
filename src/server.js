const config = require('config');
const apiServer = require('./app');

const PORT = config.get('port');

apiServer.listen(
  PORT,
  () => console.info(`${config.get('appName')} started on http://locahost:${PORT}`), // eslint-disable-line no-console
);
