import React from 'react';
import SideSection from './sideSection';
import UserHomePage from './userHomePage';
import { Col, Row } from 'reactstrap';

class DesignAward extends UserHomePage {
  render() {
    return (
      <div>
        <Row>
          <Col xs="2" style={{ border: '1px solid black' }}>
            <SideSection
              userType={this.state.userType}
              currentDate={this.state.currentDate}
            />
          </Col>

          <Col xs="5" style={{ border: '1px solid red' }}>
            <h1>Design Area</h1>
          </Col>

          <Col xs="5" style={{ border: '1px solid green' }}>
            <h1>Employee of the </h1>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DesignAward;
