// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import AboutPage from './components/AboutPage';
import UserPage from './components/UserPage';

const routes = (
  <Route path="/"          component={Layout}>
    <IndexRoute            component={IndexPage}/>
    <Route path='about'    component={AboutPage}/>
    <Route path="login"    component={LoginPage}/>
    <Route path="userpage" component={UserPage}/>
    <Route path="*"        component={NotFoundPage}/>
  </Route>
);

export default routes;
