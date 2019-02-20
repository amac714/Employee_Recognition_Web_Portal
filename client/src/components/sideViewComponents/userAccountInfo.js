import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserAccountInfo extends Component {
  render() {
    return (
      <div>
        <p>Username: {localStorage.getItem('username')}</p>
      </div>
    );
  }
}

export default UserAccountInfo;
