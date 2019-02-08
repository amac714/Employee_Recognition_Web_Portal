import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';

import SideSection from './sideSection';
import {Link} from "react-router-dom";
import axios from "axios";


class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            userType: "user",
            first_name: '',
            last_name: '',
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const { id } = this.state;

        // console.log(id)

        axios.patch(`http://localhost:5000/user/` + '6', {
            first_name: this.state.first_name,
            last_name: this.state.last_name
        }, this.state.config)

            .then((res) => {
                // console.log(res);
                this.props.history.push('/userHomePage');
            })
            .catch(err => console.log(err))
    };


    // /user/<int:u_id>

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

                        <Form onSubmit={this.handleSubmit} method="POST">
                            <Col sm="12" md={{size: 6, offset: 3}}>
                                <FormGroup>
                                    <Label>Update Name</Label>
                                    <Input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        placeholder="first name"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                    />
                                    <Input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        placeholder="last name"
                                        value={this.state.last_name}
                                        onChange={this.onChange}
                                    />
                                    <button>Update</button>
                                </FormGroup>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UpdateUserInfo;