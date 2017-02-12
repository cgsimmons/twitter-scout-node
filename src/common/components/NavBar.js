import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class NavBar extends React.Component {

  render() {
    let signInOrOut;
    let dash;
    if (this.props.isSignedIn) {
      signInOrOut = <li><a href="/auth/logout">SIGN-OUT</a></li>;
      dash = <LinkContainer to={`/user/${this.props.userId}`} activeClassName="active"><NavItem>DASHBOARD</NavItem></LinkContainer>;
    } else {
      signInOrOut = <LinkContainer to="/login" activeClassName="active"><NavItem>SIGN-IN</NavItem></LinkContainer>;
    }
    return (
      <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Twitter-Scout</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/" activeClassName="active">
              <NavItem>HOME</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/about" activeClassName="active">
              <NavItem>ABOUT</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact" activeClassName="active">
              <NavItem>CONTACT</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            {dash}
            {signInOrOut}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.userIsSignedIn,
    userId: state.userId,
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(NavBar);
