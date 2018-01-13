import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class NavBar extends React.Component {

  render() {
    let signInOrOut;
    let dash;
    if (this.props.isSignedIn) {
      signInOrOut = <li><a href="/auth/logout">SIGN-OUT</a></li>;
      dash = <LinkContainer to={`/user/${this.props.userId}`} activeHref="active"><NavItem>DASHBOARD</NavItem></LinkContainer>;
    } else {
      signInOrOut = <LinkContainer to="/login" activeHref="active"><NavItem>SIGN-IN</NavItem></LinkContainer>;
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
            <IndexLinkContainer to="/" activeHref="active">
              <NavItem>HOME</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/about" activeHref="active">
              <NavItem>ABOUT</NavItem>
            </LinkContainer>
            <LinkContainer to="/contact" activeHref="active">
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
