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
    };
  }

  // Sets state for inputs of type=text
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      });
    };
    reader.readAsDataURL(file);
    console.log(this.state.sig);
  };

  // On submit function. Puts user input together as FormData
  // and make post request to API endpoint
  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmPW } = this.state;
    if (password !== confirmPW) {
      this.setState({ validate: true });
    } else {
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
              // Redirect back to admin dashboard after 2 seconds on success
              window.setTimeout(() => {
                this.props.history.push({
                  pathname: '/adminDash',
                  state: {
                    from: 1,
                  },
                });
              }, 2000);
            }
          );
        })
        .catch(err => {
          console.log(err);
          this.setState({ invalidUsername: true });
        });
    }
  };

  render() {
    let { previewSig } = this.state;
    let $previewSig = null;
    if (previewSig) {
      $previewSig = (
        <img
          alt="previewSig"
          src={previewSig}
          style={{ height: '200px', width: '500px' }}
        />
      );
    } else {
      $previewSig = <div>Upload a signature</div>;
    }

    return (
      <div>
        <Container>
          <Alert color="success" isOpen={this.state.visible}>
            User has been created!
          </Alert>

          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Create New User</h2>
          </Col>
          <Form onSubmit={this.handleSubmit} method="POST">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  invalid={this.state.invalidUsername}
                  name="user_name"
                  id="user_id"
                  value={this.state.user_name}
                  onChange={this.onChange}
                />
                <FormFeedback invalid="true">
                  Username is already taken!
                </FormFeedback>
              </FormGroup>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
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
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  invalid={this.state.validate}
                  type="password"
                  name="confirmPW"
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
                <Input type="file" name="sig" onChange={this.onImageChange} />
              </FormGroup>
            </Col>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              {$previewSig}
            </Col>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button type="submit">Create User</Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateUser;
