import React from 'react';
import $ from 'jquery';

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

  componentDidMount() {
     this.getUser(this.props.params.userId);
  }

  render() {
    var banner_img;
    var profile_img;
    if (this.state.user.data){
      banner_img = <img src={this.state.user.data.profile_banner_url} />
      profile_img = <img src={this.state.user.data.profile_image_url} />
    }


    return (
      <div className="User">
        { banner_img }
        { profile_img }
        <h1>Welcome to your dashboard, {this.state.user.displayName}.</h1>
      </div>
    );
  }
}
