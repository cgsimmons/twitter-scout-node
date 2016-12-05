import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="About">
        <div className="logo-box">
          <img className="logo" src="/img/about-taco.jpg"/>
        </div>
        <h3>We are all about tacos!</h3>
      </div>
    );
  }
}
