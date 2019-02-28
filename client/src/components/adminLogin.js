/*
 * Description: Admin login component
 */

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

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      visible: false,
      validUN: null,
      validPW: null,
    };
  }

  // Handles logging in.
  // Makes post request to API. Sets access token
  login = e => {
    e.preventDefault();
    if (this.state.username !== '' && this.state.password !== '') {
      axios
        .post('/admin/login', {
          username: this.state.username,
          password: this.state.password,
        })
        .then(res => {
          // On successful login, store access token and id then redirect to admin dashboard
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('admin_id', res.data.id);
          console.log(localStorage.getItem('admin_id'));
          this.props.history.push('/adminDash');
        })
        .catch(err => {
          console.log(err);
          this.setState({ visible: true });
        });
    } else if (this.state.username === '') {
      this.setState({ validUN: true });
    } else if (this.state.password === '') {
      this.setState({ validPW: true });
    }
  };

  // On change handler
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
              <h1 className="login--title">Admin Login</h1>
            </Col>
            <Form onSubmit={this.login}>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    invalid={this.state.validUN}
                    className="input--login"
                    id="admin_id"
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
                    className="input--login"
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
                <Button color="primary" block className="input--login">
                  SIGN IN
                </Button>
              </Col>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

export default AdminLogin;
