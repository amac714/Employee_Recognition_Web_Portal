/*
 * Description: Admin login component
 */

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

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      // validate: {
      //   error: ''
      // }
    };
  }

  // Handles logging in. 
  // Makes post request to API. Sets access token
  login = e => {
    e.preventDefault();
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
      .catch(err => console.log(err));
  };

  // On change handler
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2>Admin Sign In</h2>
        </Col>
        <Form onSubmit={this.login}>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                id="admin_id"
                placeholder="Admin"
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

export default AdminLogin;
