import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: {
        id: 0,
        username: '',
        first_name: '',
        last_name: ''
      }
    }
  }

  renderUsers = ({ id, username, first_name, last_name }) => {
    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <th>{username}</th>
        <th>{first_name}</th>
        <th>{last_name}</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <Container>
          <h1>Users</h1>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
   
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ViewUsers;