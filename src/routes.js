// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';
import About from './components/About';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';
import ScheduledTweets from './components/ScheduledTweets';
import SuggestedTweets from './components/SuggestedTweets';
import SuggestedTweeters from './components/SuggestedTweeters';
import SearchSettings from './components/SearchSettings';
import Auth from './components/Auth';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute                         component={IndexPage}/>
    <Route path='about'                 component={About}/>
    <Route path="login"                 component={Login}/>
    <Route path="user/:userId"          component={Dashboard}>
      <IndexRoute                   component={ScheduledTweets}/>
      <Route path='statistics'    component={Statistics}/>
      <Route path='suggested-tweets'    component={SuggestedTweets}/>
      <Route path='suggested-tweeters'  component={SuggestedTweeters}/>
      <Route path='search-settings'     component={SearchSettings}/>
    </Route>
    <Route path="*"                     component={NotFoundPage}/>
  </Route>
);

export default routes;
