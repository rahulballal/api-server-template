const fastify = require('fastify');
const helmet = require('fastify-helmet');
const compression = require('compression');
const config = require('config');
const configureRoutes = require('./configure-routes');

const { isDev } = require('./utils');

const fastifyConf = (nodeEnv) => {
  if (nodeEnv === 'test') {
    return {};
  }

  return {
    logger: {
      level: config.get('logLevel'),
      prettyPrint: isDev(nodeEnv),
      name: config.get('appName'),
      safe: true,
    },
  };
};

const app = fastify(fastifyConf(process.env.NODE_ENV));

// enable gzip compression
app.use(compression());

// enable security headers
app.register(helmet);

// configure application routes
configureRoutes(app);

module.exports = app;
