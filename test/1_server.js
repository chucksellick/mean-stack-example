var skytestApp = require('../app/application.js')(),
  request = require('supertest');

describe('Application', function(){

  it('Serves an index page', function(done){
    request(skytestApp)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });

  it('Serves a partial view', function(done){
    request(skytestApp)
      .get('/partials/signin.html')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });


});