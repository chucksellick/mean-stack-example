var express = require('express');

module.exports = function() {

  skytest = express();

  // Configure Express rendering
  skytest.set('views', __dirname + '/views');
  skytest.set('view engine', 'jade');

  skytest.get('/', function(req,res,next) {
    res.render('index.jade');
  });

  return skytest;

};