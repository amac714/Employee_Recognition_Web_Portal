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
                    className="input--login"
                    id="admin_id"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    className="input--login"
                    id="pw_id"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color="primary" block className="input--login">SIGN IN</Button>
              </Col>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

export default AdminLogin;
