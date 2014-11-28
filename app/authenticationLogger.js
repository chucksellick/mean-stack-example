var mongoose = require('mongoose')
  , AuthLogSchema = require('./models/AuthLog')
  , AuthLog = mongoose.model('AuthLog')

// Authentication logging handler
module.exports = {

  list: function(callback) {
    // Return full list of logs
    AuthLog.find().exec(callback);
  },

  log: function(data, callback) {
    // Save the log to the database
    var log = new AuthLog({
      IP: data.ip,
      Username: data.username,
      Datetime: new Date(),
      Action: data.success ? "AUTH_SUCCESS" : "AUTH_FAILURE"
    });
    log.save(callback);
  }

};