import Passport from 'passport';
import User from '../models/user';

export default function () {
    Passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    Passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
