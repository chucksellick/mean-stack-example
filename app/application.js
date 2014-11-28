var express = require('express')
  , _ = require('lodash')
  , fs = require('fs')
  , expressJwt = require('express-jwt')
  , jwt = require('jsonwebtoken')
  , bodyParser = require('body-parser')
  , authentication = require('./authenticationHandler');

module.exports = function() {

  var skytest = express();

  // Configure Express rendering
  skytest.set('views', __dirname + '/views');
  skytest.set('view engine', 'jade');

  skytest.use(bodyParser.json());
  skytest.use(bodyParser.urlencoded({ extended:true }))

  // Serve home page
  skytest.get('/', function(req,res,next) {
    res.render('index.jade');
  });

  // Restrict access to API routes except for authenticated users
  skytest.use('/api', expressJwt({secret: authentication.secret}));

  // Serve auth logs
  skytest.get('/api/authentication-logs', function(req,res,next) {
    if (req.user.username !== 'admin') {
      return res.status(401).send('Not enough privileges');
    }
    res.json({ foo: 'bar' });
  });

  skytest.post('/authenticate', function (req, res) {
    // If is invalid, return 401
    authentication.authenticate(req.body.username, req.body.password, function(err, result) {
      if (err) {
        res.status(401).send('Bad username or password');
        return;
      }
      // Send the user profile inside the token
      var token = jwt.sign(result, authentication.secret, { expiresInMinutes: 60*24 });
      res.json({ token: token });
    });
  });

  _.each(fs.readdirSync(__dirname + '/views/partials'), function(file){
    var name = file.substring(0,file.indexOf('.'));
    skytest.get('/partials/'+name+".html", function(req,res,next) {
      res.render('partials/'+file);
    });
  });

  // Serve static files in public
  skytest.use(express.static(__dirname + '/public'));

  return skytest;

};