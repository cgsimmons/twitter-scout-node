var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create User Schema
var ScheduledTweet = new Schema({
  body: String,
  postDate: Date,
  posted: Boolean,
},{
  timestamps: true
});


var ScheduledTweetList = new Schema({
  title: String,
  userId: String,
  interval: String,
  startDate: Date,
  tweets: [ScheduledTweet]
},{
  timestamps: true
});


module.exports = mongoose.model('scheduledTweetLists', ScheduledTweetList);
//module.exports = mongoose.model('scheduledTweets', ScheduledTweet);
