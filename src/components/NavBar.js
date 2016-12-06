import React from 'react';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  render(){
    return (
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
    );
  }
}
