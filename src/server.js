import {} from 'dotenv/config';
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Session from 'express-session';
import Passport from 'passport';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import { Provider } from 'react-redux';
import Mongoose from 'mongoose';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import routes from './routes';
import PassportTwitter from '../auth/twitter';
import NotFoundPage from './components/NotFoundPage';
import User from '../models/user';
import ScheduledList from '../models/scheduledTweetList';
import rootReducer from './reducers';

// initialize app, server and db
const app = new Express();
const server = new Server(app);
Mongoose.connect('mongodb://localhost/twitter-scout', (err) => {
  if (err) {
    console.log('ERROR: Not connected to DB.');
  } else {
    console.log('SUCCESS: Connected to DB');
  }
});


// configure support for ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// Initialize Passport and restore authentication state
app.use(Passport.initialize());
app.use(Passport.session());

// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// route twitter authentication
app.get('/auth/twitter', PassportTwitter.authenticate('twitter'));
app.get('/auth/twitter/callback',
  PassportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication

    res.redirect(`/user/${req.user.id}`);
  });
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// authentication test
function isLoggedIn(req, res, next) {
    // console.log(req.session);
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
}

app.get('/auth', isLoggedIn, (req, res) => {
  res.redirect('/about');
});

// api hooks

// get all users
app.get('/api/users', isLoggedIn, (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(users);
    }
  });
});

// get user
app.get('/api/user/:userId', isLoggedIn, (req, res) => {
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
app.post('/api/user/:userId/tags', (req, res) => {
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
app.get('/api/user/:userId/scheduled-lists', isLoggedIn, (req, res) => {
  ScheduledList.find({ userId: req.params.userId }).sort('-createdAt').exec((err, lists) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(lists);
    }
  });
});

// remove a list
app.post('/api/user/:userId/scheduled-list/:listId', (req, res) => {
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
app.post('/api/scheduled-list/:listId/tweet', (req, res) => {
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
app.post('/api/user/:userId/scheduled-list', (req, res) => {
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


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
store.getState();
// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }
      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }
      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(
          <Provider store={store}><RouterContext {...renderProps} /></Provider>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage />);
        res.status(404);
      }
      // render the index template with the embedded React markup
      return res.render('index', { markup });
    },
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server running on http://127.0.0.1:${port} [${env}]`);
  }
});
