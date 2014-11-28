var skytestApp = require('../app/application.js')()
  , request = require('supertest')
  , authentication = require('../app/authenticationHandler.js')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , async = require('async');

describe('Authentication', function(){

  describe('handler', function() {

    it('Uses a secret of >= 128 chars', function(){
      authentication.secret.length.should.be.at.least(128);
    })

    it('Fails to authenticate with an invalid username/password', function(done){
      authentication.authenticate('foo', 'bar', function(err, result) {
        expect(err).to.exist();
        expect(result).to.not.exist();
        done();
      });
    });

    it('Authenticates with a valid username/password', function(done){
      authentication.authenticate('admin', 'password', function(err, result) {
        expect(err).to.not.exist();
        expect(result).to.exist();
        done();
      });
    });

    it('Authenticates all possible usernames', function(done) {
      var users = require('../app/users.js').list();
      async.eachSeries(users, function(user, callback){
        authentication.authenticate(user.username, user.password, callback);
      }, done);
    });

    it('Username should be case insensitive', function(done) {
      authentication.authenticate('AdMiN', 'password', function(err, result) {
        expect(err).to.not.exist();
        expect(result).to.exist();
        done();
      });
    });

    it('Password should be case sensitive', function(done) {
      authentication.authenticate('admin', 'PaSsWoRd', function(err, result) {
        expect(err).to.exist();
        expect(result).to.not.exist();
        done();
      });
    });
  });

  describe('web service', function() {

    it('Accepts a POST and fails to authenticate', function(done){
      request(skytestApp)
        .post('/authenticate')
        .send({ username: 'foo', password: 'bar' })
        .expect(401, done);
    });

    it('Accepts a POST and authenticates returning a token', function(done){
      request(skytestApp)
        .post('/authenticate')
        .send({ username: 'admin', password: 'password' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res){
          res.body.token.should.exist;
        })
        .end(done);
    });
  });
});
