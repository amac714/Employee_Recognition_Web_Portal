import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, 
        Input, Col, Label, FormFeedback } from 'reactstrap';
import axios from 'axios';

class CreateAdmin extends Component {
  constructor(){
    super();
    this.state = {
      admin_name: '',
      password: '',
      confirmPW: '',
      validate: null
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPW } = this.state;
    if(password !== confirmPW) {
      this.setState({ validate: true })
    }else {
      axios.post('http://localhost:5000/admin', {
        admin_name: this.state.admin_name,
        password: this.state.password
      })
      .then((res) => {
        this.setState({ validate: false })
        console.log(res);
        this.props.history.push('/adminDash');
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>
        <Container>
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