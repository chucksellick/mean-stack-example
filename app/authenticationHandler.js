
// Handles authentication backend

module.exports = {

  authenticate: function(username, password, callback) {
    callback(new Error("Not authenticated"));
  },

  // Hard-coded secret, used for encrypting tokens. In production should come from configuration.
  secret: "NWs2sXtWKmWBHIlJiNffyigg5FZvIx4PeFePdB80mFz9WD5rDKcPt18kluBFdxiPDDzHF48c1RBqBX1w3Ba5T6nfVD67YsK59Uobw5xL86KcVE3Ew3FJVHo6WEjxnC1A"
};
