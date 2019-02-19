/*
 * Description: The page where the user logs in. User will be directed to home screen upon successful login.
 * */

import React, { Component } from 'react';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Label,
} from 'reactstrap';
import axios from 'axios';

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      userToken: '',
      id: null,
    };
  }

  /*
   * Description: Handles form input when user attempts to login by sending input username/password to server endpoint.
   * */
  handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password,
      })
      //successful login attempt
      .then(res => {
        this.setState({ userToken: res.data.access_token , id: res.data.id});
        localStorage.setItem('username', this.state.username); //store username
        localStorage.setItem('access_token', this.state.userToken); //store user's generated token
        localStorage.setItem('id', this.state.id);
        this.props.history.push('/userHomePage'); //route to user homepage
      })

      //unsuccesfful login attempt
      .catch(function(error) {
        console.log(error);
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2>Sign In</h2>
        </Col>
        <Form onSubmit={this.handleSubmit}>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                id="user_id"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="pw_id"
                placeholder="******"
                value={this.state.password}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button>Login</Button>
          </Col>
        </Form>
      </Container>
    );
  }
}

export default UserLogin;
