import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  render(){
    let signInOrOut;
    let dash;
    if(this.props.isSignedIn){
      signInOrOut = <a href='/auth/logout'>SIGN-OUT</a>
      dash = <li><Link to={ `/user/${this.props.userId}` }>DASHBOARD</Link></li>
    } else {
      signInOrOut = <Link to='/login'>SIGN-IN</Link>
    }
    return (
      <div className='NavBar'>
        <div className='nav-container'>
          <nav>
            <ul className='nav-list'>
              <li>
                <Link to='/'>HOME</Link>
              </li>
              <li>
                <Link to='/about'>ABOUT</Link>
              </li>
              <li className='nav-left'>
                <Link to='/contact'>CONTACT</Link>
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
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(NavBar);
