var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Authenication log scheme
var AuthLogSchema = new Schema({
  IP: String,
  Datetime: {
    type: Date,
    default: function(){
      new Date()
    }
  },
  Action: String,
  Username: String
});

mongoose.model('AuthLog', AuthLogSchema);