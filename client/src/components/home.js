import React, { Component } from 'react';
import axios from 'axios';

class HomePage extends Component {
  // Feel free to delete this state, this is just to use "hello ogma" route from api
  state = {
    msg: ''
  }

  //feel free to change or delete
  componentDidMount() {
    axios.get('http://localhost:5000/')
      .then(res => {
        console.log(res);
        this.setState({ msg: res.data.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>{this.state.msg}</h1>
      </div>
    );
  }
}

export default HomePage;