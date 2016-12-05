import React from 'react';
import { Link } from 'react-router';


export default class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <a href="/auth/twitter">Log In with Twitter</a>
      </div>
    );
  }
}
