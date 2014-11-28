var dbURI = 'mongodb://localhost/skytesttest'
  , skytestApp = require('../app/application.js')()
  , request = require('supertest')
  , authentication = require('../app/authenticationHandler.js')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , async = require('async')
  , mongoose = require('mongoose')
  , authLogger = require('../app/authenticationLogger.js')
  , clearDB  = require('mocha-mongoose')(dbURI);

describe('Authentication Logs', function(){

  describe('Logger', function() {

    beforeEach(function(done){
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
    });

    it('Does not initially have any logs', function(done) {
      authLogger.list(function(err, result){
        expect(err).to.not.exist;
        result.length.should.equal(0);
        done();
      });
    });

    it('Can log an authentication attempt', function(done) {
      authLogger.log({
        ip: '1.0.0.1',
        success: false,
        username: 'tester'
      }, done);
    });

    it('Has saved the log to the database', function(done) {
      authLogger.log({
        ip: '1.0.0.1',
        success: false,
        username: 'tester'
      }, function(err,callback){
        authLogger.list(function(err,result){
          expect(err).to.not.exist;
          result.length.should.equal(1);
          done();
        });
      });
    });

    it('Has saved the correct username and IP', function(done) {
      authLogger.log({
        ip: '1.0.0.101',
        success: false,
        username: 'fred'
      }, function(err, callback){
        authLogger.list(function(err,result){
          result[0].Username.should.equal('fred');
          result[0].IP.should.equal('1.0.0.101');
          done();
        });
      });
    });

    it('Has set the Datetime', function(done) {
      var then = new Date();
      authLogger.log({
        ip: '1.0.0.1',
        success: false,
        username: 'fred'
      }, function(err,callback){
        authLogger.list(function(err,result){
          var now = new Date();
          (then <= result[0].Datetime).should.be.true;
          (now >= result[0].Datetime).should.be.true;
          done();
        });
      });
    });

    it('Can save multiple logs', function(done) {
      authLogger.log({
        ip: '1.0.0.1',
        success: false,
        username: 'bob'
      }, function(err,callback){
        authLogger.log({
          ip: '2.0.0.2',
          success: true,
          username: 'fred'
        }, function(err,callback){
          authLogger.list(function(err,result){
            result.length.should.equal(2);
            done();
          });
        });
      });
    });

    it('Saves the right action values', function(done) {
      authLogger.log({
        ip: '1.0.0.1',
        success: false,
        username: 'bob'
      }, function(err,callback){
        authLogger.log({
          ip: '2.0.0.2',
          success: true,
          username: 'fred'
        }, function(err,callback){
          authLogger.list(function(err,result){
            result[0].Action.should.equal("AUTH_FAILURE");
            result[1].Action.should.equal("AUTH_SUCCESS");
            done();
          });
        });
      });
    });

    it('Logs failure when logging in via website', function(done){
      request(skytestApp)
        .post('/authenticate')
        .send({ username: 'foo', password: 'bar' })
        .end(function(err, result) {
          authLogger.list(function(err,result){
            result.length.should.equal(1);
            result[0].Action.should.equal("AUTH_FAILURE");
            result[0].Username.should.equal("foo");
            done(err);
          });
        });
    });

/*
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
*/
  });

  describe('API', function() {

    beforeEach(function(done){
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
    });

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

    it('Doesn\'t allow access to other users', function(done){
      request(skytestApp)
        .post('/authenticate')
        .send({ username: 'manager', password: 'password' })
        .end(function(err, res) {
          var token = res.body.token;
          request(skytestApp)
            .get('/api/authentication-logs')
            .set('Authorization', 'Bearer '+token)
            .expect(401, done);
        });
    });

    it('Returns a list of authentication attempts', function(done){
      // Firstly log a couple of attempts
      authLogger.log({
        ip: '1.0.0.1',
        success: false,
        username: 'bob'
      }, function(err,callback){
        authLogger.log({
          ip: '2.0.0.2',
          success: true,
          username: 'fred'
        }, function(err,callback){
          // Now authenticate and call the authentication APIs
          request(skytestApp)
            .post('/authenticate')
            .send({ username: 'admin', password: 'password' })
            .end(function(err, res) {
              var token = res.body.token;
              request(skytestApp)
                .get('/api/authentication-logs')
                .set('Authorization', 'Bearer '+token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                  res.body.length.should.equal(3); // Third attempt was admin
                  res.body[0].Username.should.equal('bob');
                  res.body[2].Username.should.equal('admin');
                  done(err, res);
                });
            });
        });
      });

    });

  });

});
