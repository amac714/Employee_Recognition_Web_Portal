/*
 * Description: Component to display Users in DB
 */

import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      config: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    };
  }

  // When component loads, get and render users
  componentDidMount() {
    this.getUsers();
  }

  // Get users from DB with get request to API and sets state
  getUsers = () => {
    axios
      .get('/user', this.state.config)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  };

  // Delete user
  deleteUser = id => {
    axios
      .delete(`/user/${id}`, this.state.config)
      .then(this.getUsers())
      .catch(err => console.log(err));
  };

  // Render users into table
  renderUsers = ({ id, user_name, first_name, last_name }) => {
    const edit = {
      pathname: '/editUser',
      state: {
        id: `${id}`,
        user_name: `${user_name}`,
        first_name: `${first_name}`,
        last_name: `${last_name}`,
      },
    };

    console.log(edit);

    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <td>{user_name}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>
          <Link to={edit}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </Link>
        </td>
        <td>
          <a href="#0" onClick={() => this.deleteUser(`${id}`)}>
            <i className="fas fa-trash-alt" style={{ color: 'red' }} />
          </a>
        </td>
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{users.sort((a, b) => a.id - b.id).map(this.renderUsers)}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ViewUsers;
