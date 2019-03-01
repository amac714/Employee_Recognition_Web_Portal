import React, { Component } from 'react';

class UserAccountInfo extends Component {
  render() {
    return (
      <div>
          <h2 className="text-center"><strong>Account Information</strong></h2>
          <p>Username: <strong>{this.props.currentUserData.user_name}</strong></p>
          <p>First Name: <strong>{this.props.currentUserData.first_name}</strong></p>
          <p>Last Name: <strong>{this.props.currentUserData.last_name}</strong></p>
      </div>
    );
  }
}

export default UserAccountInfo;
