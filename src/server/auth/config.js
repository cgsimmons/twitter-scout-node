const configSettings = {
    twitter: {
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        callbackURL: `http://${process.env.HOST}:${process.env.PORT}/${process.env.TWITTER_CALLBACK}`,
    },
};

export default configSettings;
