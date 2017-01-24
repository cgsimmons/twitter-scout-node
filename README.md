## Twitter Scout Node

This is a simple tweet manager built using the **MERN** stack. The app uses universal routing/Javascript to allow all pages to be generated and rendered dynamically on the server using the same code as the react client. This allows the client's browser to load the server rendered markup while the bundle is downloading. It also allows for better SEO as search engines can crawl the links and view the server rendered pages (as opposed to only viewing the initial static landing page of a traditional single page app).

## Motivation

I mainly built this as an exercise to become better acquainted with React, Redux, Node, and universal routing/Javascript.

## Installation

Make a copy of the '.sample-env' file and save it as '.env' in the root directory. You must enter your personal keys into the variables. The keys are generated when you sign up at <a href='https://apps.twitter.com'>https://apps.twitter.com</a>

After your keys have been entered you can continue with the installation.

```bash
npm install
```

Next you need to have WebPack build your javascript bundle. There is a production build as well as a development build command. The development build command uses hot module replacement, which allows the bundle to dynamically build on file changes.

**Production**
```bash
npm run build
```

**Development**
```bash
npm run dev
```
After choosing a build option you can start the server.

```bash
npm start
```
**NOTE:** Be sure to use '127.0.0.1' instead of 'localhost' in your browser address. This is due to a limitation of the twitter api.
