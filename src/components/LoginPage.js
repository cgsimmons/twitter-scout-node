import React from 'react';
import { Link } from 'react-router';


export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="LoginPage">
        <a href="/about">Log In with Twitter</a>
      </div>
    );
  }
}
