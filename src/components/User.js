import React from 'react';
import $ from 'jquery';
// import { connect } from 'react-redux';
// import { userSignIn } from '../actions';

const BASE_URL = 'http://127.0.0.1:3000';

export default class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      hasErrored: false,
      isLoading: false
    }
  }

  // getUser(id) {
  //   this.setState({ isLoading: true });
  //
  //   fetch(`${BASE_URL}/api/user/${id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error(response.statusText);
  //       }
  //       this.setState({ isLoading: false });
  //       return response;
  //     })
  //     .then((response) => response.json())
  //     .then((user) => this.setState({ user }))
  //     .catch(() => this.setState({ hasErrored: true}));
  // }
  getUser(id) {
    this.setState({ isLoading: true });
    $.ajax({
      url: `${BASE_URL}/api/user/${id}`,
      success: (user) => {
        // console.log(user.data);
        this.setState({user: user, isLoading: false});
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
      }
    })
  }

  // componentWillMount() {
  //   this.props.userSignIn(this.props.params.userId);
  // }

  componentDidMount() {
     this.getUser(this.props.params.userId);
  }

  render() {
    if (this.state.hasErrored){
      return (<p>Sorry!  There was an error loading your profile</p>);
    }
    if (this.state.isLoading) {
      return (<p>Loading...</p>);
    }
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
