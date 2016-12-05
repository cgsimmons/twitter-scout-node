import React from 'react';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="logo-box">
          <img className="logo" src="/img/taco.jpg"/>
        </div>
        <h3>Hey I'm a thing!</h3>
      </div>
    );
  }
}
