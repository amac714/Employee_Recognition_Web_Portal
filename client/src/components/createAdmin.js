import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, 
        Input, Col, Label, FormFeedback, Alert } from 'reactstrap';
import axios from 'axios';

class CreateAdmin extends Component {
  constructor(){
    super();
    this.state = {
      admin_name: '',
      password: '',
      confirmPW: '',
      validate: false,
      visible: false
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('access_token');
    let config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
    const { password, confirmPW } = this.state;
    if(password !== confirmPW) {
      this.setState({ validate: true })
    }else {
      axios.post('/admin', {
        admin_name: this.state.admin_name,
        password: this.state.password
      }, config)
      .then((res) => {
        this.setState({ 
          visible: true
        })
        console.log(res);
        //this.props.history.push('/adminDash');
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Alert color="success" isOpen={this.state.visible}>Admin has been created! 
            <a href='/adminDash'>
               Click here to return to dashboard
            </a>
          </Alert>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Create New Admin</h2>
          </Col>
          <Form onSubmit={this.handleSubmit} method="POST">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="admin_name"
                  id="admin_id"
                  value={this.state.admin_name}
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
                  id="cpw_id"
                  value={this.state.confirmPW}
                  onChange={this.onChange}
                />
                <FormFeedback invalid="true">Password doesn't match!</FormFeedback>
              </FormGroup>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button type="submit">Create Admin</Button>
            </Col>
          </Form>
        </Container>
      </div>
    )
  }
}

export default CreateAdmin;