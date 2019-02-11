import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, 
        Input, Col, Label, FormFeedback, Alert } from 'reactstrap';
import axios from 'axios';

class CreateUser extends Component {
  constructor(){
    super();
    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPW: '',
      sig: '',
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onImageChange = (e) => {
    this.setState({sig: e.target.files[0]})
    console.log(this.state.sig);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', this.state.user_name);
    formData.append('password', this.state.password);
    formData.append('first_name', this.state.first_name);
    formData.append('last_name', this.state.last_name);
    formData.append('sig', this.state.sig);
    let token = localStorage.getItem('access_token');
    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    axios.post('/user', formData, config)
    .then((res) => {
      console.log(res);
      //this.props.history.push('/adminDash');
    })
    .catch(err => console.log(err))
    
  }

  render() {

    return (
      <div>
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Create New User</h2>
          </Col>
          <Form onSubmit={this.handleSubmit} method="POST">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="text"
                  name="user_name"
                  id="user_id"
                  value={this.state.user_name}
                  onChange={this.onChange}
                />
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
                <Label>Signature</Label>
                <Input
                  type="file"
                  name="sig"
                  onChange={this.onImageChange}
                />
              </FormGroup>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button type="submit">Create User</Button>
            </Col>
          </Form>
        </Container>
      </div>
    )
  }
}

export default CreateUser;