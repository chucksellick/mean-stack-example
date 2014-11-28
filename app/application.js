var express = require('express')
  , _ = require('lodash')
  , fs = require('fs');

module.exports = function() {

  var skytest = express();

  // Configure Express rendering
  skytest.set('views', __dirname + '/views');
  skytest.set('view engine', 'jade');

  // Serve home page
  skytest.get('/', function(req,res,next) {
    res.render('index.jade');
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