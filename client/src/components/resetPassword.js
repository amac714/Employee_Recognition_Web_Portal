/*
 * Description: The page where the user can reset their password
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

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirm: '',
      visible: null,
      invalid: null,
      invalidPW: null,
      msg: '',
      color: '',
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      visible: false,
      invalid: false,
      invalidPW: false,
    });
  };

  // Checks user inputs and resets password
  onSubmit = e => {
    e.preventDefault();
    const { username, password, confirm } = this.state;
    if (username === '') {
      this.setState({ invalid: true });
    } else if (username !== '' && password === '') {
      this.setState({ invalidPW: true, msg: 'You must enter a password.' });
    } else if (username !== '' && password !== confirm) {
      this.setState({
        invalidPW: true,
        msg: 'Password does not match.',
        password: '',
        confirm: '',
      });
    } else if (username !== '' && password !== '') {
      axios
        .put('/reset-password', {
          username: username,
          password: password,
        })
        .then(res => {
          this.setState(
            {
              visible: true,
              color: 'success',
              msg: 'Your password has been reset',
              username: '',
              password: '',
              confirm: '',
              invalid: false,
              invalidPW: false,
            },
            () => {
              window.setTimeout(() => {
                this.props.history.push({
                  pathname: '/userLogin',
                });
              }, 1000);
            }
          );
        })
        .catch(err => {
          console.log(err);
          this.setState({
            visible: true,
            color: 'danger',
            msg: 'Username does not exist',
          });
        });
    }
  };

  render() {
    return (
      <div className="userSigninPage">
        <Container>
          <Alert
            color={this.state.color}
            isOpen={this.state.visible}
            className="form--alert"
          >
            {this.state.msg}
          </Alert>
          <div className="login--form login--inner">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="login--title">Reset Password</h1>
            </Col>
            <Form onSubmit={this.onSubmit}>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    type="text"
                    className="input--form"
                    invalid={this.state.invalid}
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">
                    You must enter a username.
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
                    placeholder="New Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">{this.state.msg}</FormFeedback>
                </FormGroup>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    className="input--form"
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    value={this.state.confirm}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color="primary" type="submit" className="input--form">
                  Reset Password
                </Button>
              </Col>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default ResetPassword;
