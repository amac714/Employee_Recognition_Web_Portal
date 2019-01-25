import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';

import SideSection from './sideSection';
import {Link} from "react-router-dom";




class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userType: "user",
            username: '',
            password: '',
        }
    }

      // ToDO: connect to API
      handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state.username, this.state.password);
      };

      onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
      };


    render() {
        return (
            <div>
                <Row>
                    <Col xs="2" style={{border: "1px solid black"}}>
                        <SideSection userType={this.state.userType}/>
                    </Col>

                    <Col xs="10" style={{border: "1px solid red"}}>
                        <h1>Update Account Information</h1>

                        <Form onSubmit={this.handleSubmit}>
                          <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <FormGroup>
                              <Label>Update Username</Label>
                              <Input
                                type="text"
                                name="username"
                                id="admin_id"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.onChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <FormGroup>
                              <Label>Upate Password</Label>
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
                              <Link to="/userHomePage">
                                  <button>Update</button>
                              </Link>
                          </Col>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UpdateUserInfo;