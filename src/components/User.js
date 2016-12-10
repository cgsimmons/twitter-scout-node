import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { userSignIn } from '../actions/UserActions';

const BASE_URL = 'http://127.0.0.1:3000';

class User extends React.Component {

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     user: {},
  //     hasErrored: false,
  //     isLoading: false
  //   }
  // }

  // getUser(url) {
  //   this.setState({ isLoading: true });
  //   $.ajax({
  //     url: `${url}`,
  //     success: (user) => {
  //       // console.log(user.data);
  //       this.setState({user: user, isLoading: false});
  //     },
  //     error: (XMLHttpRequest, textStatus, errorThrown) => {
  //       alert("Status: " + textStatus); alert("Error: " + errorThrown);
  //     }
  //   })
  // }

  // componentWillMount() {
  //   this.props.userSignIn(this.props.params.userId);
  // }

  componentDidMount() {
     this.props.getUser(`${BASE_URL}/api/user/${this.props.params.userId}`);
  }

  render() {
    if (this.props.hasErrored){
      return (<p>Sorry!  There was an error loading your profile</p>);
    }
    if (this.props.isLoading) {
      return (<p>Loading...</p>);
    }
    let banner_img;
    let profile_img;
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
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    hasErrored: state.hasErrored,
    isLoading: state.isLoading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (url) => dispatch(userSignIn(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

// const mapStateToProps = ({ auth }) => {
//   const { user } = auth;
//   return { user };
// };
//
// export default connect(mapStateToProps, { userSignIn })(User);
