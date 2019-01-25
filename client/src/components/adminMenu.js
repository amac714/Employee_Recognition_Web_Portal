import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class AdminMenu extends Component {
  render() {
    return ( 
      <div className="container-div">
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <div className="admin_dash_header">Admin Dashboard</div>
            <Link to="/admin/viewUsers">View Users</Link>
            <br />
            <Link to="/">View Admin Users</Link>
            <br />
            <Link to="/">View Reports</Link>
          </Col>
        </Container>
      </div>
    );
  }
}

export default AdminMenu;