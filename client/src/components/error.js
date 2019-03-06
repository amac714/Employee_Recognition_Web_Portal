import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div className="error--page">
        <i className="fas fa-exclamation-triangle fa-7x"></i>
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <p>This page did not load properly. Check to make sure URL is correct.</p>
      </div>
    );
  }
}

export default ErrorPage;
