/*
 * Description: Component for editing Admin users
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
} from 'reactstrap';
import axios from 'axios';

class EditAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      admin_name: '',
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
    this.getAdmin();
  }

  // On form input change handler to set state
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Get Admin that will be edited
  getAdmin = () => {
    this.setState({
      id: this.props.location.state.id,
      admin_name: this.props.location.state.admin_name,
    });
  };

  // Delete selected admin from table
  deleteAdmin = id => {
    axios
      .delete(`/admin/${id}`, this.state.config)
      .then(this.props.history.push('/adminDash'))
      .catch(err => console.log(err));
  };

  // Save update to admin
  saveEdit = e => {
    e.preventDefault();
    const { password, confirmPW, id } = this.state;
    // PW validation
    if (password !== confirmPW) {
      this.setState({ validate: true });
    } else {
      // Patch request to API endpoint to update admin. 
      // Passes access token for auth.
      axios
        .patch(
          `/admin/${id}`,
          {
            admin_name: this.state.admin_name,
            password: this.state.password,
          },
          this.state.config
        )
        .then(res => {
          console.log(res);
          this.props.history.push('/adminDash');
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Edit Admin</h2>
          </Col>
          <Form onSubmit={this.saveEdit} method="POST">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Input
                  type="text"
                  name="admin_name"
                  id="admin_id"
                  value={this.state.admin_name}
                  placeholder="Admin Name"
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
              <Button type="submit">Save Admin</Button>
            </Col>

            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button
                color="danger"
                onClick={() => this.deleteAdmin(this.state.id)}
              >
                Delete Admin
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditAdmin;
