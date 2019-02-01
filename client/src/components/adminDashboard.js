import React, { Component } from 'react';
import { Button, Container, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import ViewUsers from './adminViewUsers';
import ViewAdmins from './adminViewAdmins';
import Reports from './sideViewComponents/reports';

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      buttonPressed: 0
    }
  }

  handleClick = (button) => {
    this.setState({ buttonPressed: button })
  }

  renderComponent = () => {
    if(this.state.buttonPressed === 1)
      return <ViewUsers />
    else if(this.state.buttonPressed === 2)
      return <ViewAdmins />
  }

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
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button onClick={() => this.handleClick(1)}>View Users</Button>
              <Button onClick={() => this.handleClick(2)}>View Admins</Button>
            </Col>
          </Row>
        </Container>
        {this.renderComponent()}
        {/* <Row>
          <Col xs="5" style={{ border: "1px solid black" }}>
            <ViewUsers />
          </Col>
          <Col xs="5" style={{ border: "1px solid black" }}>
            <ViewAdmins />
          </Col>
        </Row>   */}
      </div>
    );
  }
}

export default AdminDashboard;