/*
 * Description: Component for editing Users
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
      validate: false,
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
    this.setState({ [e.target.name]: e.target.value });
  };

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
    const { password, confirmPW, id } = this.state;
    // PW validation
    if (password !== confirmPW) {
      this.setState({ validate: true });
    } else {
      // Patch request to API endpoint to update user.
      // Passes access token for auth.
      axios
        .patch(
          `/user/${id}`,
          {
            username: this.state.user_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
          },
          this.state.config
        )
        .then(res => {
          this.props.history.push('/adminDash');
        })
        .catch(err => console.log(err));
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
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Edit User</h2>
          </Col>
          <Form onSubmit={this.saveEdit}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Input
                  type="text"
                  name="user_name"
                  id="user_id"
                  value={this.state.user_name}
                  placeholder="New Email"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Input
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
                  type="password"
                  name="password"
                  id="pw_id"
                  value={this.state.password}
                  placeholder="New Password"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Input
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
                <Input type="file" name="sig" onChange={this.onImageChange} />
              </FormGroup>
            </Col>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              {$previewSig}
            </Col>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button type="submit">Save User</Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditUser;
