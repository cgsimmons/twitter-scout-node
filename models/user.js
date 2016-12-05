var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var User = new Schema({
  displayName: String,
  username: String,
  twitterId: String,
  token: String
});


module.exports = mongoose.model('users', User);
