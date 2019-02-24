/*
 * Description: Component for Admin dashboard
 */

import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Col, Row } from 'reactstrap';
import ViewUsers from './adminViewUsers';
import ViewAdmins from './adminViewAdmins';
import Reports from './sideViewComponents/reports';

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      buttonPressed: '',
    };
  }

  // Displays appropriate component
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.from === 1)
        this.setState({ buttonPressed: 1 });
      else if (this.props.location.state.from === 2)
        this.setState({ buttonPressed: 2 });
    } else this.setState({ buttonPressed: 0 });
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
    else return <h2>Admin Dashboard</h2>;
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs="2" style={{ border: '1px solid black' }}>
            <h3>Menu</h3>
            <Nav vertical>
              <NavItem>
                <NavLink href="#" onClick={() => this.handleClick(1)}>
                  View Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.handleClick(2)}>
                  View Admins
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.handleClick(3)}>
                  View Reports
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 1 }}>
            {this.renderComponent()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdminDashboard;
