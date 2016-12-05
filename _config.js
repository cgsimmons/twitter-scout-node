const ids = {
  twitter: {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
};

export default ids;
