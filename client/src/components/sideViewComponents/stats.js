import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div>
          <h2><strong>Submitted Awards</strong></h2>
          <p>Employee of the Week: <strong>{this.props.awardData.employeeOfTheWeek}</strong></p>
          <p>Employee of the Month: <strong>{this.props.awardData.employeeOfTheMonth}</strong></p>
          <p>Total Awards: <strong>{this.props.awardData.numberOfAwardsGiven}</strong></p>
      </div>
    );
  }
}

export default Stats;
