import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    let token = localStorage.getItem('access_token');
    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.get('/user', config)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }
  renderUsers = ({ id, user_name, first_name, last_name }) => {
    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <th>{user_name}</th>
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
          <Link to="/createUser">Create New User</Link>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{users.map(this.renderUsers)}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ViewUsers;