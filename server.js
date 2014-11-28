var skytestApp = require('./app/application.js')()
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/skytest');

skytestApp.listen(3000);

console.log("Server running on http://localhost:3000");