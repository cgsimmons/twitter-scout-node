const ids = {
  twitter: {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: 'https://twitter-scout.herokuapp.com/auth/twitter/callback',
  },
};

console.log(ids.twitter.callbackURL);

export default ids;
