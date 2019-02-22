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
      admin_id: '',
      admins: [],
      config: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    };
  }

  // When component loads, render table with admin users
  componentDidMount() {
    this.getAdmins();
  }

  // Get admin users from DB and set state
  getAdmins = () => {
    axios
      .get('/admin', this.state.config)
      .then(res => this.setState({ 
        admin_id: localStorage.getItem('admin_id'),
        admins: res.data, 
      }))
      .catch(err => console.log(err));
  };

  // Delete selected admin from table
  deleteAdmin = id => {
    axios
      .delete(`/admin/${id}`, this.state.config)
      .then(this.getAdmins())
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

    if(this.state.admin_id === `${id}`) {
      // Don't let logged in admin delete themselves
      return (
        <tr key={id}>
          <th scope="row">{id}</th>
          <td>{admin_name}</td>
          <td>
            <Link to={edit}>
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </Link>
          </td>
          <td></td>
        </tr>
      )
    }else {
      // Admin users are mapped into the table so key is set to id
      return (
        <tr key={id}>
          <th scope="row">{id}</th>
          <td>{admin_name}</td>
          <td>
            <Link to={edit}>
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </Link>
          </td>
          <td>
            <a href="#0" onClick={() => this.deleteAdmin(`${id}`)}>
              <i className="fas fa-trash-alt" style={{ color: 'red' }} />
            </a>
          </td>
        </tr>
      );
    }
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{admins.sort((a, b) => a.id - b.id).map(this.renderAdmins)}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ViewAdmins;
