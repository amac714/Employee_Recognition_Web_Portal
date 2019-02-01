import React, { Component } from 'react';
import { Button, Table, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  componentDidMount() {
    this.getAdmins();
  }

  getAdmins = () => {
    axios.get('http://localhost:5000/getAdmin')
    .then(res => this.setState({ admins: res.data }))
    .catch(err => console.log(err));
  }

  renderUsers = ({ id, admin_name }) => {
    return (
      <tr key={id}>
        <th scope="row">{id}</th>
        <th>{admin_name}</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    );
  };

  render() {
    const { admins } = this.state;
    return (
      <div>
        <Container>
          <h1>Admins</h1>
          <Link to='/addAdmin'>Add New Admin</Link>
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
              {admins.map(this.renderUsers)}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ViewAdmins;