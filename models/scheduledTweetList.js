var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create User Schema
var ScheduledTweetList = new Schema({
  title: String,
  userId: String,
  interval: String,
  startDate: Date,
  tweets: Array
},{
  timestamps: true
});


module.exports = mongoose.model('scheduledTweetLists', ScheduledTweetList);
