const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// create User Schema
const User = new Schema({
  displayName: String,
  username: String,
  twitterId: String,
  token: String,
  secret: String,
  data: Object,
  tags: Array,
},
  {
    timestamps: true,
  });


module.exports = mongoose.model('users', User);
