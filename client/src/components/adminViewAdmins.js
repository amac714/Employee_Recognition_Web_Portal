import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';

class ViewAdmins extends Component {
  constructor() {
    super();
    this.state = {
      admins: [],
      admin: {
        id: 0,
        username: '',
      }
    }
  }

  renderUsers = ({ id, username }) => {
    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <th>{username}</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    );
  };

  render() {
    return (
      <div>
        <Container>
          <h1>Admins</h1>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
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

export default ViewAdmins;