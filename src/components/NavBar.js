import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  render(){
    let signInOrOut;
    let dash;
    if(this.props.isSignedIn){
      signInOrOut = <a href='/logout'>Sign-Out</a>
      dash = <li><Link to={ `/user/${this.props.user._id}` }>Dash</Link></li>
    } else {
      signInOrOut = <Link to='/login'>Sign-In</Link>
    }
    return (
      <div className='NavBar'>
        <div className='nav-container'>
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
              {dash}
              <li>{ signInOrOut }</li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.userIsSignedIn,
    user:     state.user
  };
};

export default connect(mapStateToProps)(NavBar);
