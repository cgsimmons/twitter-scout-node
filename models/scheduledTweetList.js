import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ScheduledTweet = new Schema({
  body: String,
  postDate: Date,
  posted: Boolean,
},
  {
    timestamps: true,
  });


const ScheduledTweetList = new Schema({
  title: String,
  userId: String,
  interval: String,
  startDate: Date,
  tweets: [ScheduledTweet],
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('scheduledTweetLists', ScheduledTweetList);
