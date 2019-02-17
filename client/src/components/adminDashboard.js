/*
 * Description: Component for Admin dashboard
 */

import React, { Component } from 'react';
import { Button, Nav, NavItem, NavLink, Col, Row, Alert } from 'reactstrap';
import ViewUsers from './adminViewUsers';
import ViewAdmins from './adminViewAdmins';
import Reports from './sideViewComponents/reports';

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      buttonPressed: 0,
    };
  }

  // Sets which component to display
  handleClick = button => {
    this.setState({ buttonPressed: button });
  };

  // Renders component based on button pressed
  renderComponent = () => {
    if (this.state.buttonPressed === 1) return <ViewUsers />;
    else if (this.state.buttonPressed === 2) return <ViewAdmins />;
    else if (this.state.buttonPressed === 3) return <Reports />;
    else return (<h2>Admin Dashboard</h2>)
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs="2" style={{ border: '1px solid black' }}>
            <h3>Menu</h3>
            <Nav vertical>
              <NavItem>
                <NavLink href="#" onClick={() => this.handleClick(1)}>View Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.handleClick(2)}>View Admins</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.handleClick(3)}>View Reports</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 1 }}>
            {this.renderComponent()}
          </Col>
        </Row>
        {/* <Row>
          <Col xs="2" style={{ border: '1px solid black' }}>
            <Reports />
            <Button onClick={() => this.handleClick(1)}>View Users</Button>
            <Button onClick={() => this.handleClick(2)}>View Admins</Button>
          </Col>
          <Col>
            {this.renderComponent()}
          </Col>

          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button onClick={() => this.handleClick(1)}>View Users</Button>
            <Button onClick={() => this.handleClick(2)}>View Admins</Button>
          </Col> 
        </Row> */}
      </div>
    );
  }
}

export default AdminDashboard;
