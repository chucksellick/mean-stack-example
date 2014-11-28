var skytestApp = require('../app/application.js')()
  , request = require('supertest')
  , authentication = require('../app/authenticationHandler.js')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

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

  });

  describe('web service', function() {

    it('Accepts a POST and fails to authenticate', function(done){
      request(skytestApp)
        .post('/authenticate', { username: 'foo', password: 'bar' })
        .expect(401, done);
    });

  });
});
    
