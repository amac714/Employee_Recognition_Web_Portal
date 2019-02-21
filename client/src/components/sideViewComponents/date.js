/*
 * Description: Will display the date to the screen.
 * */

import React, { Component } from 'react';
import './sideSection.css';

class Date extends Component {
  render() {
    return (
      <div className="dateText">
        <p>{this.props.date.currentDay}</p>
        <p>{this.props.date.currentDate}</p>
      </div>
    );
  }
}

export default Date;
