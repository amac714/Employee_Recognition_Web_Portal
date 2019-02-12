/*
 * Description: Component to display Admin users
 */

import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ViewAdmins extends Component {
  constructor() {
    super();
    this.state = {
      admins: [],
    };
  }

  // When component loads, render table with admin users
  componentDidMount() {
    this.getAdmins();
  }

  // Get admin users from DB and set state
  getAdmins = () => {
    let token = localStorage.getItem('access_token');
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get('/admin', config)
      .then(res => this.setState({ admins: res.data }))
      .catch(err => console.log(err));
  };

  // Render admin users into table
  renderAdmins = ({ id, admin_name }) => {
    // Edit object, sets a state to pass as prop to Edit component
    const edit = {
      pathname: '/editAdmin',
      state: {
        id: `${id}`,
        admin_name: `${admin_name}`,
      },
    };
    // Admin users are mapped into the table so key is set to id
    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <th>{admin_name}</th>
        <th>
          <Link to={edit}>Update</Link>
        </th>
      </tr>
    );
  };

  render() {
    const { admins } = this.state;
    return (
      <div>
        <Container>
          <h1>Admins</h1>
          <Link to="/addAdmin">Add New Admin</Link>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Admin Name</th>
                <th />
              </tr>
            </thead>
            <tbody>{admins.map(this.renderAdmins)}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ViewAdmins;
