/*
 * Description: Admin component to add new users to DB
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
  Alert,
  FormFeedback,
} from 'reactstrap';
import axios from 'axios';

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPW: '',
      sig: '',
      previewSig: '',
      visible: false,
      validate: false,
      invalidUsername: false,
      invalidSig: false,
      errorMsg: '',
    };
  }

  // Sets state for inputs of type=text
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      invalidUsername: false,
      validate: false,
      invalidPW: false,
    });
  };

  // Set state for user's signature
  onImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        sig: file,
        previewSig: reader.result,
        invalidSig: false,
      });
    };
    reader.readAsDataURL(file);
    console.log(this.state.sig);
  };

  // On submit function. Puts user input together as FormData
  // and make post request to API endpoint
  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmPW, user_name, sig } = this.state;
    if (user_name !== '' && password !== confirmPW) {
      this.setState({ validate: true });
    } else if (user_name === '') {
      this.setState({
        invalidUsername: true,
        errorMsg: 'You must enter a username.',
      });
    } else if (password === '') {
      this.setState({ invalidPW: true })
    } else if (sig === '') {
      this.setState({ invalidSig: true })
    }
    else {
      const formData = new FormData();
      formData.append('username', this.state.user_name);
      formData.append('password', this.state.password);
      formData.append('first_name', this.state.first_name);
      formData.append('last_name', this.state.last_name);
      formData.append('sig', this.state.sig);
      let token = localStorage.getItem('access_token'); // need access token for auth
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post('/user', formData, config)
        .then(res => {
          console.log(res);
          // Clear state and display confirmation
          this.setState(
            {
              user_name: '',
              password: '',
              confirmPW: '',
              first_name: '',
              last_name: '',
              sig: '',
              previewSig: '',
              visible: true,
              validate: false,
              invalidUsername: false,
            },
            () => {
              // Redirect back to admin dashboard after 1 second
              window.setTimeout(() => {
                this.props.history.push({
                  pathname: '/adminDash',
                  state: {
                    from: 1,
                  },
                });
              }, 1000);
            }
          );
        })
        .catch(err => {
          console.log(err);
          this.setState({
            invalidUsername: true,
            errorMsg: 'This username is unvailable.',
          });
        });
    }
  };

  render() {
    let { previewSig, errorMsg } = this.state;
    let $previewSig = null;
    if (previewSig) {
      $previewSig = (
        <img
          alt="previewSig"
          src={previewSig}
          style={{ height: '200px', width: '500px' }}
        />
      );
    }

    return (
      <div>
        <Container>
          <Alert color="success" isOpen={this.state.visible} className="form--alert">
            User has been created!
          </Alert>

          <div className="login--form">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="login--title">New User</h1>
            </Col>
            <Form onSubmit={this.handleSubmit} method="POST">
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    className="input--form"
                    type="email"
                    invalid={this.state.invalidUsername}
                    name="user_name"
                    placeholder="Email"
                    value={this.state.user_name}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">{errorMsg}</FormFeedback>
                </FormGroup>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    className="input--form"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    className="input--form"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    className="input--form"
                    type="password"
                    invalid={this.state.invalidPW}
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <FormFeedback invalid="true">
                    You must enter a password.
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
                <FormGroup>
                  <Label>Signature</Label>
                  <Input type="file" invalid={this.state.invalidSig} name="sig" onChange={this.onImageChange} />
                  <FormFeedback invalid="true">
                    Please upload a signature.
                </FormFeedback>
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                {$previewSig}
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color="primary" type="submit" className="user-button input--form">Create User</Button>
              </Col>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default CreateUser;
