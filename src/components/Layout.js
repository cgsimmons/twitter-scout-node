// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <nav>
            <ul className='nav-list'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li className='nav-left'>
                <Link to='/contact'>Contact</Link>
              </li>
              <li><Link to='/login'>Sign-In</Link></li>
            </ul>
          </nav>
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
