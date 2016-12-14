var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var User = new Schema({
  displayName: String,
  username: String,
  twitterId: String,
  token: String,
  secret: String,
  data: Object,
  tags: Array
},{
    timestamps: true
});


module.exports = mongoose.model('users', User);
