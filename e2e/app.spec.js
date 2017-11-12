const supertest = require('supertest');
const chai = require('chai');

chai.use(require('dirty-chai'));

const app = require('../src/app');

const request = supertest(app);

describe('App', () => {
  describe('Meta Endpoints', () => {
    it('/ping should return pong with 200 OK', (done) => {
      request
        .get('/ping')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.expect(res.body).to.exist();
          chai.expect(res.body.message).to.equal('pong');
          return done();
        });
    });
  });

  describe('Demo Endpoints', () => {
    describe('GET /v1/demo/:id', () => {
      it('should return 200 OK for id:1', () => request.get('/v1/demo/1').expect(200));

      it('should return 404 NOT FOUND for id:12', () => request.get('/v1/demo/12').expect(404));
    });

    describe('POST /v1/demo', () => {
      it('should return 201 ACCEPTED on successful post', (done) => {
        request
          .post('/v1/demo')
          .send({ name: 'test', affiliation: 'test' })
          .set('Content-Type', 'application/json')
          .expect(201)
          .end(done);
      });
    });
  });
});
