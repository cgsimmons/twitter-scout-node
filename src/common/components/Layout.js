// src/components/Layout.js
import React from 'react';
import NavBar from './NavBar';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <NavBar />
        </header>
        <div className="app-body">
          <div className="app-content">
            {this.props.children}
          </div>
        </div>
        <footer>
          <div className="footer-inner">
            <p>
              <strong>Brought to you by Chris Simmons.</strong>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}
