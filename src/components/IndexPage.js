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
      </div>
    );
  }
}
