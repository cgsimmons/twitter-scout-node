// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router';
import NavBar from './NavBar';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <NavBar className='NavBar' />
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
          <strong>Brought to you by Taco Corp.</strong>
          </p>
        </footer>
      </div>
    );
  }
}
