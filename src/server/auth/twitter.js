import Passport from 'passport';
import Strategy from 'passport-twitter';
import User from '../models/user';
import Config from './config';
import Init from './serialize';

// Configure twitter passport
Passport.use(
    new Strategy(
        {
            consumerKey: Config.twitter.consumerKey,
            consumerSecret: Config.twitter.consumerSecret,
            callbackURL: Config.twitter.callbackURL,
        },
        (token, tokenSecret, profile, done) => {
            const searchQuery = {
                displayName: profile.displayName,
            };

            const updates = {
                displayName: profile.displayName,
                username: profile.username,
                twitterId: profile.id,
                secret: tokenSecret,
                data: profile._json,
                token,
            };

            const options = {
                upsert: true,
            };

            User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        },
    ),
);

// serialize user into the Session
Init();

export default Passport;
