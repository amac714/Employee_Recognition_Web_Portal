/*
 * Description: Will display the date to the screen.
 * */

import React, { Component } from 'react';

class Date extends Component {
  render() {
    return (
      <div className="dateText text-center">
          <p><strong>{this.props.date.currentDay}</strong></p>
          <p><strong>{this.props.date.currentDate}</strong></p>
      </div>
    );
  }
}

export default Date;
