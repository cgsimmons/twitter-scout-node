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

//initialize app, server and db
const app = new Express();
const server = new Server(app);
Mongoose.connect('mongodb://localhost/twitter-scout');
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
    console.log(req.session);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
app.get('/auth', isLoggedIn, (req, res) => {
  res.redirect('/about');
});


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
        markup = renderToString(<RouterContext {...renderProps}/>);
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
