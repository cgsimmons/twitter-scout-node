## Twitter Scout Node

This is a simple tweet manager built using the **MERN** stack. The app uses universal routing/Javascript to allow all pages to be generated and rendered dynamically on the server using the same code as the react client. This allows the client's browser to load the server rendered markup while the bundle is downloading. It also allows for better SEO as search engines can crawl the links and view the server rendered pages (as opposed to only viewing the initial static landing page of a traditional single page app).

## Motivation

I mainly built this as an exercise to become better acquainted with React, Redux, Node, and universal routing/Javascript.

## Twitter API

You must first register with twitter in order to generate the necessary keys to complete installation. You can sign up at <a href='https://apps.twitter.com'>https://apps.twitter.com</a>.

## Installation

Make a copy of the '.sample-env' file and save it as '.env' in the root directory. You must enter your personal keys into the variables. In a production setting be sure to set the environment variables manually.

```bash
CONSUMER_KEY=your_consumer_key
CONSUMER_SECRET=your_consumer_secret
ACCESS_TOKEN=your_access_token
ACCESS_SECRET=your_access_secret
TWITTER_CALLBACK=http://127.0.0.1:3000/auth/twitter/callback
MONGODB_URI=mongodb://localhost/twitter-scout
```

After your keys have been entered you can continue with the installation.

**Development**
```bash
npm install
npm run watch
npm run start-dev
```

**Production**
```bash
npm install
npm run build
npm run start
```



**NOTE:** Be sure to use '127.0.0.1' instead of 'localhost' in your browser address. This is due to a limitation of the twitter api.
