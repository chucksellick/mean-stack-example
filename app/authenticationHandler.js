
// Handles authentication backend

var users = require('./users.js')
  , authLogger = require('./authLogger.js');

module.exports = {

  authenticate: function(username, password, callback) {
    if (typeof username === 'undefined' || !username || typeof password === 'undefined' || !password) {
      return callback(new Error("Missing username or password"));
    }
    var found = false;
    _.each(users.list(), function(user) {
      if (user.username.toLowerCase() === username.toLowerCase() && user.password === password) {
        found = true;
        callback(null, user);
      }
    });
    if (!found) {
      callback(new Error("Not authenticated"));
    }
  },

  // Hard-coded secret, used for encrypting tokens. In production should come from configuration.
  secret: "NWs2sXtWKmWBHIlJiNffyigg5FZvIx4PeFePdB80mFz9WD5rDKcPt18kluBFdxiPDDzHF48c1RBqBX1w3Ba5T6nfVD67YsK59Uobw5xL86KcVE3Ew3FJVHo6WEjxnC1A"
};
