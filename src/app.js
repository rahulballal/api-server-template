const fastify = require('fastify');
const helmet = require('fastify-helmet');
const compression = require('compression');
const config = require('config');
const configureRoutes = require('./configure-routes');

const {
  isDev,
} = require('./utils');

const app = fastify({
  logger: {
    level: config.get('logLevel'),
    prettyPrint: isDev(process.env.NODE_ENV),
    name: config.get('appName'),
    safe: true,
  },
});

// enable gzip compression
app.use(compression());

// enable security headers
app.register(helmet);

// configure application routes
configureRoutes(app);

module.exports = app;
