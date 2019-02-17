/*
 * Description: Component that allows the user to create an employee award.
 * */

import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Col, Label } from 'reactstrap';

class UserCreateAward extends Component {
  constructor() {
    super();

    this.state = {
      award_type: '',
      first_name: '',
      last_name: '',
      time_granted: '',
      date_granted: '',
      config: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    };
  }

  /*
   * Description: Upon user submitting form, will contact server endpoint to create an award.
   * */
  handleSubmit = e => {
    e.preventDefault();

    // Send award data
    axios
      .post(
        '/user/9/award',
        {
          award_type: this.state.award_type,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          time_granted: this.state.time_granted,
          date_granted: this.state.date_granted,
        },
        this.state.config
      )
      .then(res => {
        console.log(res);
        window.location.reload(); // reloads the web page so that form will reset and award table is refreshed
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Create Award</h1>

        <Form onSubmit={this.handleSubmit}>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Award Type</Label>
              <Input
                type="select"
                name="award_type"
                id="award_type"
                // placeholder="username"
                value={this.state.award_type}
                onChange={this.onChange}
              >
                <option value="week">Week</option>
                <option value="month">Month</option>
              </Input>
            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Recipient's First Name</Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="first name"
                value={this.state.first_name}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>

          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Recipient's Last Name</Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="last_name"
                value={this.state.last_name}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>

          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Datetime</Label>
              <Input
                type="time"
                name="time_granted"
                id="time_granted"
                placeholder="time"
                value={this.state.time_granted}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>

          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Date</Label>
              <Input
                type="date"
                name="date_granted"
                id="date_granted"
                placeholder="date_granted"
                value={this.state.date_granted}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>

          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button>Submit</Button>
          </Col>
        </Form>
      </div>
    );
  }
}

export default UserCreateAward;
