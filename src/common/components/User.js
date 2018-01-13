import React from 'react';
import { connect } from 'react-redux';
import { userSignIn } from '../actions/UserActions';
import { getScheduledListArray } from '../actions/ScheduledListActions';

class User extends React.Component {
    componentDidMount() {
        this.props.getUser(this.props.userId);
        this.props.getScheduledLists(this.props.userId);
    }

    render() {
        if (this.props.hasErrored) {
            return (<p>Sorry!  There was an error loading your profile</p>);
        }
        if (this.props.isLoading) {
            return (<p>Loading...</p>);
        }

        let bannerImg;
        let profileImg;
        let profileDisplayName;
        let profileUsername;

        const user = this.props.user;
        if (user.data) {
            bannerImg = <img src={user.data.profile_banner_url} alt="Banner" />;
            profileImg = <img src={user.data.profile_image_url.replace('_normal', '_bigger')} alt="Profile" />;
            profileDisplayName = <div className="profile-displayName">{user.displayName}</div>;
            profileUsername = <div className="profile-username">@{user.username}</div>;
        }

        return (
          <div className="User">
            <div className="profile-banner">
              { bannerImg }
            </div>
            <div className="profile-content">
              { profileImg }
              <div className="profile-names">
                {profileDisplayName}
                {profileUsername}
              </div>
              <h1 className="profile-message">Welcome to your dashboard.</h1>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        hasErrored: state.userHasErrored,
        isLoading: state.userIsLoading,
        isSignedIn: state.userIsSignedIn,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id) => { dispatch(userSignIn(id)); },
        getScheduledLists: (id) => { dispatch(getScheduledListArray(id)); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
