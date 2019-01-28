import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import ViewUsers from './adminViewUsers';
import ViewAdmins from './adminViewAdmins';
import Reports from './sideViewComponents/reports';

class AdminDashboard extends Component {
  render() {
    return ( 
      <div className="container-div">
        <Container>
          <Row>
            <Col style={{ border: "1px solid black" }}>
              <Reports />
            </Col>
          </Row>
        </Container>
        <Row>
          <Col xs="6" style={{ border: "1px solid black" }}>
            <ViewUsers />
          </Col>
          <Col xs="6" style={{ border: "1px solid black" }}>
            <ViewAdmins />
          </Col>
        </Row>  
      </div>
    );
  }
}

export default AdminDashboard;