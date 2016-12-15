import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className="About">
        <div className="logo-box">
          <h1 className='logo-title'>About us</h1>
          <img className="logo about" src="/img/scope3.jpeg"/>
        </div>
        <h3>We are all about tacos!</h3>
      </div>
    );
  }
}
