import React from 'react';
import { connect } from 'react-redux';
import { userSignIn } from '../actions/UserActions';

const BASE_URL = 'http://127.0.0.1:3000';

class User extends React.Component {

  render() {
    if (this.props.hasErrored){
      return (<p>Sorry!  There was an error loading your profile</p>);
    }
    if (this.props.isLoading) {
      return (<p>Loading...</p>);
    }

    let banner_img;
    let profile_img;
    let signed_in_message;
    const user = this.props.user;
    if (user.data){
      banner_img = <img src={user.data.profile_banner_url} />
      profile_img = <img src={user.data.profile_image_url} />
    }

    return (
      <div className="User">
        { banner_img }
        { profile_img }
        <h1>Welcome to your dashboard, {user.displayName}.</h1>
      </div>
    );
  }

  componentDidMount() {
     this.props.getUser(`${BASE_URL}/api/user/${this.props.params.userId}`);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    hasErrored: state.userHasErrored,
    isLoading: state.userIsLoading,
    isSignedIn: state.userIsSignedIn
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (url) => dispatch(userSignIn(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
