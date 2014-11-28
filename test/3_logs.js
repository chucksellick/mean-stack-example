var skytestApp = require('../app/application.js')()
  , request = require('supertest')
  , authentication = require('../app/authenticationHandler.js')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , async = require('async');

describe('Authentication Logs', function(){

  describe('access', function() {

    it('Refuses access to unathenticated users', function(done){
      request(skytestApp)
        .get('/api/authentication-logs')
        .expect(401, done);
    });

    it('Allows access to admin user', function(done){
      request(skytestApp)
        .post('/authenticate')
        .send({ username: 'admin', password: 'password' })
        .end(function(err, res) {
          var token = res.body.token;
          request(skytestApp)
            .get('/api/authentication-logs')
            .set('Authorization', 'Bearer '+token)
            .expect(200, done);
        });
    });

  });
});
