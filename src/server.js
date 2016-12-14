import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Session from 'express-session';
import Passport from 'passport';
import PassportTwitter from '../auth/twitter';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import Mongoose from 'mongoose';
import User from '../models/user';
import ScheduledList from '../models/scheduledTweetList';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

//initialize app, server and db
const app = new Express();
const server = new Server(app);
Mongoose.connect('mongodb://localhost/twitter-scout', (err, res) => {
  if (err) {
    console.log('ERROR: Not connected to DB.');
  } else {
    console.log('SUCCESS: Connected to DB');
  }
});


//configure support for ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport and restore authentication state
app.use(Passport.initialize());
app.use(Passport.session());

//route twitter authentication
app.get('/auth/twitter', PassportTwitter.authenticate('twitter'));
app.get('/auth/twitter/callback',
  PassportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    //TODO get user info to pass
    //TODO pass prop to set NavBar
    res.redirect('/user/'+req.user.id);
  });
app.get('/logout', (req, res) =>{
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

//authentication test
function isLoggedIn(req, res, next){
    // console.log(req.session);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
app.get('/auth', isLoggedIn, (req, res) => {
  res.redirect('/about');
});

//api hooks
app.get('/api/users', isLoggedIn, (req, res) => {
  User.find({}, (err, users) => {
    if(err){
      res.status(500).send(err.message);
    } else {
      res.status(200).json(users);
    }
  });
});
app.get('/api/user/:userId', isLoggedIn, (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if(err){
      res.status(500).send(err.message);
    } else {
      // console.log(user)
      res.status(200).send(user);
    }
  });
});
app.post('/api/user/:userId/tags', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if(err){
      res.status(500).send(err.message);
    } else {
      user.tags = req.body.tags;
      user.save();
      res.status(200).send(user);
    }
  })
});
app.get('/api/user/:userId/scheduled-lists', isLoggedIn, (req, res) => {
  ScheduledList.find({userId: req.params.userId}).sort('-createdAt').exec((err, lists) => {
    if(err){
      res.status(500).send(err.message);
    } else {
      res.status(200).send(lists);
    }
  });
});

app.post('/api/user/:userId/scheduled-list/:listId', (req, res) => {
  ScheduledList.remove({userId: req.params.userId, _id: req.params.listId}, (err, removed) => {
    if (err)
      return res.status(500).send(err.message);

    ScheduledList.find({userId: req.params.userId}).sort('-createdAt').exec((err, newList) => {
      if (err)
        return res.status(500).send(err.message);

      res.status(200).send(newList)
    })
  })
});

app.post('/api/user/:userId/scheduled-list', (req, res) => {
  let newList = req.body.newList;
  console.log(req.body.newList);
  let list = new ScheduledList({
    title:      newList.title,
    userId:     newList.userId,
    interval:   newList.interval,
    startDate:  newList.startDate,
    tweets:     []
  })

  list.save((err, list) => {
    if (err)
      return res.status(500).send(err.message);

    ScheduledList.find({userId: req.params.userId}).sort('-createdAt').exec((err, lists) => {
      if(err){
        res.status(500).send(err.message);
      } else {
        res.status(200).send(lists);
      }
    });
  })
});


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
const initialState = store.getState();
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
        markup = renderToString(<Provider store={store}><RouterContext {...renderProps}/></Provider>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }
      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
