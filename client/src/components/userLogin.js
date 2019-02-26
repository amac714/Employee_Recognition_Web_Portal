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
        localStorage.setItem('password', this.state.password);
        localStorage.setItem('first_name', this.state.first_name);
        localStorage.setItem('last_name', this.state.last_name);

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
        <div className="login--form">
          <div className="login--inner">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="login--title">Sign In</h1>
            </Col>
            <Form onSubmit={this.handleSubmit}>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Label>Username</Label>
                  <Input
                    type="text"
                    name="username"
                    className="input--login"
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
                    className="input--login"
                    id="pw_id"
                    placeholder="******"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color="primary" block className="input--login">Login</Button>
              </Col>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

export default UserLogin;
