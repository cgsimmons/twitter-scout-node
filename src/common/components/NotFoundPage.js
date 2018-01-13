import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
      <div className="not-found">
        <div className="logo-box">
          <img className="logo" src="/img/lost-penguin.jpg" alt="logo" />
        </div>
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    );
};

export default NotFoundPage;
