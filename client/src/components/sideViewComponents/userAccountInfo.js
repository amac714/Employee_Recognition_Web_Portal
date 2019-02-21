import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserAccountInfo extends Component {
  render() {
    return (
      <div>
        <p>Username: {this.props.currentUserData.user_name}</p>
        <p>First Name: {this.props.currentUserData.first_name}</p>
        <p>Last Name: {this.props.currentUserData.last_name}</p>
      </div>
    );
  }
}

export default UserAccountInfo;
