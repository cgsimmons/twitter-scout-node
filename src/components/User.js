import React from 'react';
import $ from 'jquery';
// import { connect } from 'react-redux';
// import { userSignIn } from '../actions';

const BASE_URL = 'http://127.0.0.1:3000';

export default class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }
  }

  getUser(id) {
    $.ajax({
      url: `${BASE_URL}/api/user/${id}`,
      success: function(user) {
        // console.log(user.data);
        this.setState({user: user})
      }.bind(this)
    })
  }

  // componentWillMount() {
  //   this.props.userSignIn(this.props.params.userId);
  // }

  componentDidMount() {
     this.getUser(this.props.params.userId);
  }

  render() {
    let banner_img;
    let profile_img;
    const user = this.state.user;
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

// const mapStateToProps = ({ auth }) => {
//   const { user } = auth;
//   return { user };
// };
//
// export default connect(mapStateToProps, { userSignIn })(User);
