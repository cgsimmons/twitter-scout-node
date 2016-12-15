import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="About">
        <div className="logo-box">
          <img className="logo" src="/img/scope.jpeg"/>
        </div>
        <h3>We are all about tacos!</h3>
      </div>
    );
  }
}
