/*
 * Description: Component that allows the user to create an employee award.
 * */

import React, {Component} from 'react';
import {Container, Form, FormGroup, Input, Col, Label, Button} from 'reactstrap';
import './userHomePageStyle.css'


class UserCreateAward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            award_type: 'Employee of the Week',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
        };
    }

    /**/
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    sendAward = () => {
        this.props.submitAward(this.state);
        this.setState({
            award_type: 'Employee of the Week',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
        })
    };

    render() {
        return (
            <Container>
                <h2 className="text-center">Create Award</h2>

                <Form>
                        <FormGroup row className="form_spacing">
                            <Label sm={4} className="input_text">Award Type:</Label>
                            <Col sm={8}>
                                <Input
                                    className="input_width"
                                    type="select"
                                    name="award_type"
                                    id="award_type"
                                    onChange={this.onChange}
                                >
                                    <option value="Employee of the Week">Employee of the Week</option>
                                    <option value="Employee of the Month">Employee of the Month</option>
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="form_spacing">
                            <Label sm={4} className="input_text">First Name:</Label>
                            <Col sm={8}>
                                <input
                                    className="input_width"
                                    type='text'
                                    name='first_name'
                                    id='first_name'
                                    placeholder='First Name'
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="form_spacing">
                            <Label sm={4} className="input_text">Last Name:</Label>
                            <Col sm={8}>
                                <input
                                    className="input_width"
                                    type='text'
                                    name='last_name'
                                    id='last_name'
                                    placeholder='Last Name'
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="form_spacing">
                            <Label sm={4} className="input_text">Time Granted:</Label>
                            <Col sm={8}>
                                <input
                                    className="input_width"
                                    type='time'
                                    name='time_granted'
                                    id='time_granted'
                                    placeholder="time"
                                    value={this.state.time_granted}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row className="form_spacing">
                            <Label sm={4} className="input_text">Date Granted:</Label>
                            <Col sm={8}>
                                <input
                                    className="input_width"
                                    type='date'
                                    name='date_granted'
                                    id='date_granted'
                                    placeholder='Date Granted'
                                    value={this.state.date_granted}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </FormGroup>

                    <Col sm="12" md={{ size: 6, offset: 6 }}>
                        <Button type="button" onClick={this.sendAward}>Submit</Button>
                    </Col>
                </Form>
            </Container>
        );
    }
}

export default UserCreateAward;