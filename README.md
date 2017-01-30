## Twitter Scout Node

This is a simple tweet manager built using the **MERN** stack. The app uses universal routing/Javascript to allow all pages to be generated and rendered dynamically on the server using the same code as the react client. This allows the client's browser to load the server rendered markup while the bundle is downloading. It also allows for better SEO as search engines can crawl the links and view the server rendered pages (as opposed to only viewing the initial static landing page of a traditional single page app).

## Motivation

I mainly built this as an exercise to become better acquainted with React, Redux, Node, and universal routing/Javascript.

## Twitter API

You must first register with twitter in order to generate the necessary keys to complete installation. You can sign up at <a href='https://apps.twitter.com'>https://apps.twitter.com</a>.

**NOTE:** If you plan to run the app locally, set your twitter callback to **http://127.0.0.1:3000/auth/twitter/callback**. If you will run in production then change the domain and port to match your desired location. You will need to modify **_config.js** to match your callback.
```javascript
const ids = {
  twitter: {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
};
```

## Installation

Make a copy of the '.sample-env' file and save it as '.env' in the root directory. You must enter your personal keys into the variables. In a production setting be sure to set the environment variables manually.

```bash
CONSUMER_KEY=your_consumer_key
CONSUMER_SECRET=your_consumer_secret
ACCESS_TOKEN=your_access_token
ACCESS_SECRET=your_access_secret
```

After your keys have been entered you can continue with the installation.

```bash
npm install
npm run build
npm start
```

You may alternatively use **npm run dev** instead of **npm run build** if you would like webpack to use hot reloading.

**NOTE:** Be sure to use '127.0.0.1' instead of 'localhost' in your browser address. This is due to a limitation of the twitter api.
