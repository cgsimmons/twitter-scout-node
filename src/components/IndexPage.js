import React from 'react';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <h1 className='logo-title'>Twitter Scout</h1>
        <p className='logo-tagline'>twitter management made easy</p>
        <a href="/auth/twitter" className="login-button under-logo">Sign in with Twitter</a>
        <div className="logo-box">
          <img className="logo" src="/img/scope2.jpg"/>
        </div>
      </div>
    );
  }
}
