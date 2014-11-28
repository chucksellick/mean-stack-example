var mongoose = require('mongoose')
  , AuthLogSchema = require('./models/AuthLog')
  , AuthLog = mongoose.model('AuthLog')

// Authentication logging handler
module.exports = {

  list: function(callback) {
    AuthLog.find().exec(callback);
  },

  log: function(username, ip, success, callback) {
  }

};