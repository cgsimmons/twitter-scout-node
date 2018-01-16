import mongoose from 'mongoose';

const { Schema } = mongoose;

const ScheduledTweet = new Schema({
    listId: String,
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

// ScheduledTweet.post('remove', (doc) => {
//   ScheduledTweetList.findOne({ _id: doc.listId }, (err, list) => {
//     for (let i = 0; i < list.tweets.length; i += 1) {
//       console.log(list.tweets[i].body);
//     }
//   });
// });

module.exports = mongoose.model('scheduledTweetLists', ScheduledTweetList);
