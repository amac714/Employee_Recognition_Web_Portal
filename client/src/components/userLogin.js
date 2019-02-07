import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Input, Col, Label } from 'reactstrap';

class UserLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  // ToDO: connect to API
  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state.username, this.state.password);
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  render(){
    return (
      <Container>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2>Sign In</h2>
        </Col>
        <Form onSubmit={this.handleSubmit}>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                id="user_id"
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

export default UserLogin;