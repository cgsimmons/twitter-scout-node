import {} from 'dotenv/config';
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Session from 'express-session';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import { Provider } from 'react-redux';
import Mongoose from 'mongoose';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Passport from 'passport';
import api from './api';
import auth from './auth';
import routes from '../common/routes';
import rootReducer from '../common/reducers';

// initialize app, server and db
const app = new Express();
const server = new Server(app);
Mongoose.connect('mongodb://localhost/twitter-scout', (err) => {
  if (err) {
    console.error('ERROR: Not connected to DB.');
  } else {
    console.info('SUCCESS: Connected to DB');
  }
});


// configure support for ejs templates for markup injection
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

// Initialize Passport
app.use(Passport.initialize());
app.use(Passport.session());

// authentication routes
app.use('/auth', auth);

// api routes
app.use('/api', api);

// set up redux store
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
      } else if (redirectLocation) {
        // in case of redirect propagate the redirect to the browser
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        // if the current route matched we have renderProps
        // generate the React markup for the current route
        const markup = renderToString(
          <Provider store={store}><RouterContext {...renderProps} /></Provider>);
        // render the index template with the embedded React markup
        return res.render('index', { markup });
      }
      // This should always be caught by react-router * route
      return res.status(404).end('Not found');
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
