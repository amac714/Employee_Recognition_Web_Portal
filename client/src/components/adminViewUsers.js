import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';

//delete this later
let user = {
  id: 1,
  username: 'test@gmail.com',
  first_name: 'alan',
  last_name: 'macabuhay'
}

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

  componentDidMount(){
    this.setState({ users: user })
  }

  renderUsers = ({ id, username, first_name, last_name }) => {
    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <th>{username}</th>
        <th>{first_name}</th>
        <th>{last_name}</th>
        <th>Delete</th>
      </tr>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
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