// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import Login from './components/Login';
import About from './components/About';
import User from './components/User';
import Auth from './components/Auth';
//
// function authenticate(nextState, transition){
//   if (!(!!localStorage.token)) {
//     transition({
//       pathname: '/login',
//       state: {nextPathname: nextState.location.pathname}
//     })
//   }
// }

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute                component={IndexPage}/>
    <Route path='about'        component={About}/>
    <Route path="login"        component={Login}/>
    <Route path="user/:userId" component={User}/>
    <Route path="*"            component={NotFoundPage}/>
  </Route>
);

export default routes;
