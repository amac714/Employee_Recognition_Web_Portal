/*
 * Description: Admin component to add new Admins to DB
 */

import React, { Component } from 'react';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  FormFeedback,
  Alert,
} from 'reactstrap';
import axios from 'axios';

class CreateAdmin extends Component {
  constructor() {
    super();
    this.state = {
      admin_name: '',
      password: '',
      confirmPW: '',
      validate: false,
      visible: false,
      invalidAdmin: false,
      invalidPW: false,
      errorMsg: '',
    };
  }

  // Sets state on input change
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      validate: false,
      invalidAdmin: false,
      invalidPW: false,
    });
  };

  // On submit function. Makes post request to endpoint.
  handleSubmit = e => {
    e.preventDefault();
    // Get access token and create header for auth
    let token = localStorage.getItem('access_token');
    let config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { password, confirmPW, admin_name } = this.state;

    // Confirm password, makes sure form is not empty
    if (admin_name !== '' && password !== confirmPW) {
      this.setState({ validate: true });
    } else if (admin_name === '') {
      this.setState({
        invalidAdmin: true,
        errorMsg: 'You must enter a username',
      });
    } else if (password === '') {
      this.setState({ invalidPW: true });
    } else if (admin_name !== '' && password !== '') {
      // Post request. Passing new admin info and auth token
      axios
        .post(
          '/admin',
          {
            admin_name: this.state.admin_name,
            password: this.state.password,
          },
          config
        )
        .then(res => {
          this.setState(
            {
              visible: true,
              admin_name: '',
              password: '',
              confirmPW: '',
              validate: false,
              invalidAdmin: false,
            },
            () => {
              // Redirect back to admin dashboard after 1 second
              window.setTimeout(() => {
                this.props.history.push({
                  pathname: '/adminDash',
                  state: {
                    from: 2,
                  },
                });
              }, 1000);
            }
          );
        })
        .catch(err => {
          // Catching this error means Username is unvailable
          console.log(err);
          this.setState({
            invalidAdmin: true,
            errorMsg: 'This username is unvailable.',
          });
        });
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Alert color="success" isOpen={this.state.visible} className="form--alert">
            Admin has been created!
          </Alert>
          <div className="login--form">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="login--title">New Admin</h1>
            </Col>
            <Form onSubmit={this.handleSubmit}>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    type="text"
                    className="input--form"
                    invalid={this.state.invalidAdmin}
                    name="admin_name"
                    id="admin_id"
                    placeholder="Username"
                    value={this.state.admin_name}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">
                    {this.state.errorMsg}
                  </FormFeedback>
                </FormGroup>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    className="input--form"
                    invalid={this.state.invalidPW}
                    type="password"
                    name="password"
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
                <FormGroup>
                  <Input
                    className="input--form"
                    invalid={this.state.validate}
                    type="password"
                    name="confirmPW"
                    id="cpw_id"
                    placeholder="Confirm Password"
                    value={this.state.confirmPW}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">
                    Password doesn't match!
                </FormFeedback>
                </FormGroup>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color="primary" type="submit" className="input--form">Add Admin</Button>
              </Col>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default CreateAdmin;
