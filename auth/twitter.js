import Passport from 'passport';
import Strategy from 'passport-twitter';

import User from '../models/user';
import Config from '../_config';
import Init from './init';

//Configure twitter passport
Passport.use(new Strategy({
    consumerKey: Config.twitter.consumerKey,
    consumerSecret: Config.twitter.consumerSecret,
    callbackURL: Config.twitter.callbackURL
  },
  (token, tokenSecret, profile, done) => {

    var searchQuery = {
      displayName: profile.displayName,
    };

    var updates = {
      displayName:  profile.displayName,
      username:     profile.username,
      twitterId:    profile.id,
      token:        token
    };

    var options = {
      upsert: true
    };

    User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
      if(err){
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }
));

//serialize user into the Session
Init();

export default Passport;
