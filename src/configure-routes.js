const ping = require('./handlers/meta');
const demo = require('./handlers/demo');

module.exports = (fastifyApp) => {
  fastifyApp.get('/ping', ping.opts, ping.handler);
  fastifyApp.get('/v1/demo/:id', demo.getOne.opts, demo.getOne.handler);
  fastifyApp.post('/v1/demo', demo.post.opts, demo.post.handler);
};
