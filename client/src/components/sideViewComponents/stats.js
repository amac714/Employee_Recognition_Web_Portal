import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';


class Stats extends Component {
  render() {
    return (
      <div className="test">
          <h2 className="text-center"><strong>Submitted Awards</strong></h2>

          <Row className="sideSectionRow">
              <Col sm="10" className="removeColumnPadding">
                  <p>Employee of the Week:</p>
                  <p>Employee of the Month:</p>
                  <p>Total Awards:</p>
              </Col>
              <Col sm="2" className="removeColumnPadding">
                  <p><strong className="userData">{this.props.awardData.employeeOfTheWeek}</strong></p>
                  <p><strong className="userData">{this.props.awardData.employeeOfTheMonth}</strong></p>
                  <p><strong className="userData">{this.props.awardData.numberOfAwardsGiven}</strong></p>
              </Col>
          </Row>


      </div>
    );
  }
}

export default Stats;
