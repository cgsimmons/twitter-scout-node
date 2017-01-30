import express from 'express';
import User from '../models/user';
import ScheduledList from '../models/scheduledTweetList';

const router = express.Router();

// authentication test
function isLoggedIn(req, res, next) {
    // console.log(req.session);
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
}

// get all users
router.get('/users', isLoggedIn, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(users);
    }
  });
});

// get user
router.get('/user/:userId', isLoggedIn, (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      // console.log(user)
      res.status(200).send(user);
    }
  });
});

// update tags
router.put('/user/:userId/tags', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const newUser = user;
      newUser.tags = req.body.tags;
      newUser.save();
      res.status(200).send(user);
    }
  });
});

// get all lists
router.get('/user/:userId/scheduled-lists', isLoggedIn, (req, res) => {
  ScheduledList.find({ userId: req.params.userId }).sort('-createdAt').exec((err, lists) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(lists);
    }
  });
});

// remove a list
router.delete('/user/:userId/scheduled-list/:listId', isLoggedIn, (req, res) => {
  ScheduledList.remove({ userId: req.params.userId, _id: req.params.listId }, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      ScheduledList.find({ userId: req.params.userId }).sort('-createdAt').exec((listErr, newList) => {
        if (listErr) {
          res.status(500).send(err.message);
        } else {
          res.status(200).send(newList);
        }
      });
    }
  });
});

// new list
router.post('/scheduled-list', isLoggedIn, (req, res) => {
  const newList = req.body.newList;
  const list = new ScheduledList({
    title: newList.title,
    userId: newList.userId,
    interval: newList.interval,
    startDate: newList.startDate,
    tweets: [],
  });

  list.save((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      ScheduledList.find({ userId: list.userId }).sort('-createdAt').exec((listErr, lists) => {
        if (listErr) {
          res.status(500).send(err.message);
        } else {
          res.status(200).send(lists);
        }
      });
    }
  });
});

// delete tweet
router.post('/tweet/:tweetId', (req, res) => {
  ScheduledList.findOne({ 'tweets._id': req.params.tweetId }, (err, list) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      list.tweets.id(req.params.tweetId).remove();
      list.save((tweetErr) => {
        if (tweetErr) {
          res.status(500).send(err.message);
        } else {
          res.status(200).send(list);
        }
      });
    }
  });
});

// new tweet
router.post('/scheduled-list/tweet', isLoggedIn, (req, res) => {
  const newTweet = req.body.newTweet;

  ScheduledList.findOne({ _id: newTweet.selectedList }, (err, list) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const tweet = {
        body: newTweet.body,
        postDate: newTweet.postDate,
        posted: false,
      };
      list.tweets.push(tweet);
      list.save((saveErr, newList) => {
        if (saveErr) {
          res.status(500).send(err.message);
        } else {
          // return res.status(200).send(newList);
          ScheduledList.find({ userId: newList.userId }).sort('-createdAt').exec((listErr, lists) => {
            if (listErr) {
              res.status(500).send(err.message);
            } else {
              res.status(200).send(lists);
            }
          });
        }
      });
    }
  });
});

export default router;
