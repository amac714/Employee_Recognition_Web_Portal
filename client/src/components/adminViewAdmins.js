import React, { Component } from 'react';
import { Table, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ViewAdmins extends Component {
  constructor() {
    super();
    this.state = {
      admins: []
    }
  }

  componentDidMount() {
    this.getAdmins();
  }

  getAdmins = () => {
    axios.get('http://localhost:5000/admin')
    .then(res => this.setState({ admins: res.data }))
    .catch(err => console.log(err));
  }

  renderAdmins = ({ id, admin_name }) => {
    const edit = {
      pathname: '/editAdmin',
      state: {
        id: `${id}`,
        admin_name: `${admin_name}`
      }
    }
    return (
        <tr key={id}>
          <th scope="row">{id}</th>
          <th>{admin_name}</th>
          <th><Link to={edit}>Update</Link></th>
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
                <th>Admin Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admins.map(this.renderAdmins)}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ViewAdmins;