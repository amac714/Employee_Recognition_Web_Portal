/*
 * Description: The first page any user lands on.
 * */

import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

//import Container from "reactstrap/es/Container";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textTitle: 'Recognize Great Work',
    };
  }

  componentDidMount() {
    axios
      .get('/')
      .then(res => {
        console.log(res);
        this.setState({ msg: res.data.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="home">
          <div className="home--login">
            <h1 className="home--title">{this.state.textTitle}</h1>
            <Link to="/userLogin">
              <Button className="home--button" color="primary" size="lg">
                Login
              </Button>
            </Link>
          </div>
      </div>
    );
  }
}

export default HomePage;
