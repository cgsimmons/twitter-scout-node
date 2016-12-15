import React from 'react';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <h1 className='logo-title'>Twitter Scout</h1>
        <p className='logo-tagline'>twitter management made easy</p>

        <div className="logo-box">
          <img className="logo" src="/img/scope2.jpg"/>
        </div>
        <h3>Hey I'm a thing!</h3>
        <a href="#" class="btn azm-social azm-btn azm-border-bottom azm-facebook"><i class="fa fa-facebook"></i> Log in with Facebook</a>
      </div>
    );
  }
}
