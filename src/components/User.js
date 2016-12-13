import React from 'react';
import { connect } from 'react-redux';
import { userSignIn } from '../actions/UserActions';
import { getScheduledListArray } from '../actions/ScheduledListActions';

class User extends React.Component {

  render() {
    if (this.props.hasErrored){
      return (<p>Sorry!  There was an error loading your profile</p>);
    }
    if (this.props.isLoading) {
      return (<p>Loading...</p>);
    }

    let banner_img, profile_img, signed_in_message, profile_displayName, profile_username;

    const user = this.props.user;
    if (user.data){
      banner_img = <img src={user.data.profile_banner_url} />
      profile_img = <img src={user.data.profile_image_url.replace('_normal', '_bigger')} />
      profile_displayName = <div className='profile-displayName'>{user.displayName}</div>
      profile_username = <div className='profile-username'>@{user.username}</div>
    }

    return (
      <div className="User">
        <div className='profile-banner'>
          { banner_img }
        </div>
        <div className='profile-content'>
          { profile_img }
          <div className='profile-names'>
            {profile_displayName}
            {profile_username}
          </div>
          <h1>Welcome to your dashboard, {user.displayName}.</h1>
        </div>
      </div>
    );
  }

  componentDidMount() {
     this.props.getUser(this.props.userId);
     this.props.getScheduledLists(this.props.userId);
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
    getUser: (id) => dispatch(userSignIn(id)),
    getScheduledLists: (id) => dispatch(getScheduledListArray(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
