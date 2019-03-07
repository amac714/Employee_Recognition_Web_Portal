/*
 * Description: Component for editing Users
 */

import React, { Component } from 'react';
import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  FormFeedback,
  Label,
} from 'reactstrap';
import axios from 'axios';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user_name: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPW: '',
      sig: '',
      validate: false,
      invalidEmail: false,
      invalidPW: false,
      invalidSig: false,
      visible: false,
      errorMsg: '',
      config: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    };
  }

  componentDidMount() {
    this.getUser();
  }

  // On form input change handler to set state
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      invalidEmail: false,
      validate: false,
      invalidPW: false,
    });
  };

  // Handle upload of signature, show preview
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

  // Get User that will be edited
  getUser = () => {
    this.setState({
      id: this.props.location.state.id,
      user_name: this.props.location.state.user_name,
      first_name: this.props.location.state.first_name,
      last_name: this.props.location.state.last_name,
    });
  };

  // Save update
  saveEdit = e => {
    e.preventDefault();
    const { password, confirmPW, id, user_name, sig } = this.state;
    // PW validation
    if (user_name !== '' && password !== confirmPW) {
      this.setState({ validate: true });
    } else if (user_name === '') {
      this.setState({
        invalidEmail: true,
        errorMsg: 'You must enter an email',
      });
    } else if (password === '') {
      this.setState({ invalidPW: true });
    } else if (sig === '') {
      this.setState({ invalidSig: true });
    } else {
      const formData = new FormData();
      formData.append('username', this.state.user_name);
      formData.append('password', this.state.password);
      formData.append('first_name', this.state.first_name);
      formData.append('last_name', this.state.last_name);
      formData.append('sig', this.state.sig);
      // Patch request to API endpoint to update user.
      // Passes access token for auth.
      axios
        .patch(`/user/${id}`, formData, this.state.config)
        .then(res => {
          console.log(res);
          this.setState(
            {
              user_name: '',
              first_name: '',
              last_name: '',
              password: '',
              confirmPW: '',
              validate: false,
              visible: true,
            },
            () => {
              // Redirect back to admin dashboard after 1 seconds on success
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
            invalidEmail: true,
            errorMsg: 'This email already exists',
          });
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
    }

    return (
      <div>
        <Container>
          <Alert
            color="success"
            isOpen={this.state.visible}
            className="form--alert"
          >
            User has been saved!
          </Alert>

          <div className="login--form">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h1 className="login--title">Edit User</h1>
            </Col>
            <Form onSubmit={this.saveEdit}>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input
                    className="input--form"
                    type="email"
                    invalid={this.state.invalidEmail}
                    name="user_name"
                    id="user_id"
                    value={this.state.user_name}
                    placeholder="New Email"
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
                    type="text"
                    name="first_name"
                    value={this.state.first_name}
                    placeholder="First Name"
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
                    value={this.state.last_name}
                    placeholder="Last Name"
                    onChange={this.onChange}
                  />
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
                    value={this.state.password}
                    placeholder="New Password"
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
                    id="cpw_id"
                    value={this.state.confirmPW}
                    placeholder="Confirm Password"
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
                  <Input
                    type="file"
                    invalid={this.state.invalidSig}
                    name="sig"
                    onChange={this.onImageChange}
                  />
                  <FormFeedback invalid="true">
                    Please upload a signature.
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                {$previewSig}
              </Col>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button
                  color="primary"
                  type="submit"
                  className="user-button input--form"
                >
                  Save User
                </Button>
              </Col>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default EditUser;
