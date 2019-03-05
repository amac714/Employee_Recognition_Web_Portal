/*
 * Description: Component for Admin dashboard
 */

import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
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
    else
      return (
        <div>
          <h1>Admin Dashboard</h1>
          <p>
            Welcome to the admin dashboard. From here you can add, edit, or delete
            users and admins. To get started select an option from the menu on
            the left.
          </p>
        </div>
      );
  };

  render() {
    return (
      <Container>
        <Row className="admin--dash">
          <Col xs="3">
            <div className="admin--menu">
              <h1>Menu</h1>
              <a href="#0" onClick={() => this.handleClick(1)}>
                View Users
              </a>
              <a href="#0" onClick={() => this.handleClick(2)}>
                View Admins
              </a>
              <a href="#0" onClick={() => this.handleClick(3)}>
                View Reports
              </a>
            </div>
          </Col>
          <Col
            sm="12"
            md={{ size: 6, offset: 1 }}
            className="admin--dash--content"
          >
            {this.renderComponent()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
