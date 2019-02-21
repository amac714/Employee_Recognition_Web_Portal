import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div>
        <h2>Submitted Awards</h2>
        <p>Employee of the Week: {this.props.awardData.employeeOfTheWeek}</p>
        <p>Employee of the Month: {this.props.awardData.employeeOfTheMonth}</p>
        <p>Total Awards: {this.props.awardData.numberOfAwardsGiven}</p>
      </div>
    );
  }
}

export default Stats;
