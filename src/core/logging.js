const pino = require('pino');
const config = require('config');
const { isDev } = require('../utils');

const logger = pino({
  safe: true,
  name: `${config.get('appName')}-logger`,
  level: config.get('logLevel'),
  prettyPrint: isDev(process.env.NODE_ENV),
  messageKey: 'msg',
});

const quietLogger = {
  info() {},
  error() {},
  debug() {},
};

module.exports = process.env.NODE_ENV === 'test' ? quietLogger : logger;
