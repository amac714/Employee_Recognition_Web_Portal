/*
 * Description: The page where the user logs in. User will be directed to home screen upon successful login.
 * */

import React, { Component } from 'react';
import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Col,
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
      visible: false,
      validUN: null,
      validPW: null,
    };
  }

  /*
   * Description: Handles form input when user attempts to login by sending input username/password to server endpoint.
   * */
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.username !== '' && this.state.password !== '') {
      axios
        .post('/user/login', {
          username: this.state.username,
          password: this.state.password,
        })
        //successful login attempt
        .then(res => {
          this.setState({ userToken: res.data.access_token, id: res.data.id });
          localStorage.setItem('username', this.state.username); //store username
          localStorage.setItem('access_token', this.state.userToken); //store user's generated token
          localStorage.setItem('id', this.state.id);
          localStorage.setItem('password', this.state.password);
          localStorage.setItem('first_name', this.state.first_name);
          localStorage.setItem('last_name', this.state.last_name);

          this.props.history.push('/userHomePage'); //route to user homepage
        })

        //unsuccesfful login attempt
        .catch(error => {
          console.log(error);
          this.setState({ visible: true });
        });
    } else if (this.state.username === '') {
      this.setState({ validUN: true });
    } else if (this.state.password === '') {
      this.setState({ validPW: true });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      validPW: this.state.validPW ? false : null,
      validUN: this.state.validUN ? false : null,
    });
  };

  // Closes alert, clears form
  onDismiss = () => {
    this.setState({
      visible: false,
      username: '',
      password: '',
    });
  };

  render() {
    return (
      <Container>
        <div>
          <Alert
            className="form--alert"
            color="danger"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            Username or password is incorrect!
          </Alert>
        </div>
        <div className="login--form">
          <div className="login--inner">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="login--title">Sign In</h1>
            </Col>
            <Form onSubmit={this.handleSubmit}>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    invalid={this.state.validUN}
                    className="input--form"
                    id="user_id"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">
                    You must enter a username!
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    invalid={this.state.validPW}
                    className="input--form"
                    id="pw_id"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">
                    You must enter a password
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color="primary" block className="input--form">
                  Login
                </Button>
              </Col>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

export default UserLogin;
