const proxyquire = require('proxyquire');

const configureRoutes = proxyquire('./configure-routes', {
  './handlers/meta': { opts: 'opts', handler: 'handler' },
  './handlers/demo': {
    getOne: { opts: 'opts', handler: 'handler' },
    post: { opts: 'opts', handler: 'handler' },
  },
});

describe('condigure-router', () => {
  let sandbox = null;
  before(() => {
    sandbox = sinon.sandbox.create();
  });

  after(() => {
    sandbox.reset();
  });
  it('should configure app correctly with routes', (done) => {
    const fakeApp = {
      get: sandbox.spy(),
      post: sandbox.spy(),
    };

    configureRoutes(fakeApp);
    sinon.assert.callCount(fakeApp.get, 2);
    sinon.assert.calledOnce(fakeApp.post);
    done();
  });
});
