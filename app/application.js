var express = require('express');

module.exports = function() {

  skytest = express();

  // Configure Express rendering
  skytest.set('views', __dirname + '/views');
  skytest.set('view engine', 'jade');

  // Serve home page
  skytest.get('/', function(req,res,next) {
    res.render('index.jade');
  });

  // Serve static files in public
  skytest.use(express.static(__dirname + '/public'));

  return skytest;

};