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

// router.get('/auth', isLoggedIn, (req, res) => {
//   res.redirect('/about');
// });

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

// accept tags
router.post('/user/:userId/tags', (req, res) => {
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
router.post('/user/:userId/scheduled-list/:listId', (req, res) => {
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

// accept a new tweet
router.post('/scheduled-list/:listId/tweet', (req, res) => {
  ScheduledList.findOne({ _id: req.params.listId }, (err, list) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const newTweet = req.body.newTweet;
      // let postDate = newTweet.postDate;
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

// accept a new list
router.post('/user/:userId/scheduled-list', (req, res) => {
  const newList = req.body.newList;
  // console.log(req.body.newList);
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
      ScheduledList.find({ userId: req.params.userId }).sort('-createdAt').exec((listErr, lists) => {
        if (listErr) {
          res.status(500).send(err.message);
        } else {
          res.status(200).send(lists);
        }
      });
    }
  });
});

export default router;
