// src/components/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found">
        <div className="logo-box">
          <img className="logo" src="/img/lost-penguin.jpg"/>
        </div>
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    );
  }
}