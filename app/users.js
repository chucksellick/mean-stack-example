// Hard-coded list of users for test requirements
_ = require('lodash');

var usernames = ['user', 'manager', 'admin', 'developer', 'tester'];
var password = 'password';

module.exports = {
  list: function(){
    return _.map(usernames, function(username){
      return {
        username: username,
        password: password
      };
    });
  }
};