import React from 'react';

export default class User extends React.Component {
  render() {
    return (
      <div className="User">
        <h1>Welcome, {this.props.params.token} to your dashboard!</h1>
      </div>
    );
  }
}
