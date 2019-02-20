import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div>
        <h1>Stats</h1>
        <p>Employee of the Week:</p>
        <p>Employee of the Month:</p>
        <p>My Total Awards:</p>

        <h1>Submitted Awards</h1>
        <p>Employee of the Week: {this.props.awardData.employeeOfTheWeek}</p>
        <p>Employee of the Month: {this.props.awardData.employeeOfTheMonth}</p>
        <p>Total Awards: {this.props.awardData.numberOfAwardsGiven}</p>
      </div>
    );
  }
}

export default Stats;
