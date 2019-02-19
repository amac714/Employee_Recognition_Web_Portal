/*
 * Description: Component that allows the user to create an employee award.
 * */

import React, {Component} from 'react';
import {Container, Form, FormGroup, Input, Col, Label} from 'reactstrap';


class UserCreateAward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            award_type: 'week',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
        };
    }


    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    sendAward = () => {
        this.props.submitAward(this.state);
        this.setState({
            award_type: 'week',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
        })

    };

    render() {
        return (
            <Container>
                <h1>Create Award</h1>

                <Form onSubmit={this.sendAward.bind(this)}>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>Award Type</Label>
                            <Input
                                type="select"
                                name="award_type"
                                id="award_type"
                                onChange={this.onChange}
                            >
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>First Name</Label>
                            <br/>
                            <input
                                type='text'
                                name='first_name'
                                id='first_name'
                                placeholder='First Name'
                                value={this.state.first_name}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <br/>
                            <input
                                type='text'
                                name='last_name'
                                id='last_name'
                                placeholder='Last Name'
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <Label>Time Granted</Label>
                        <br/>
                        <input
                            type='time'
                            name='time_granted'
                            id='time_granted'
                            placeholder='Time Granted'
                            onChange={this.onChange}
                        />
                    </Col>

                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>Date Granted</Label>
                            <br/>
                            <input
                                type='date'
                                name='date_granted'
                                id='date_granted'
                                placeholder='Date Granted'
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>

                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <input type="submit" value="Submit"/>
                    </Col>
                </Form>
                {/*<Col sm="12" md={{size: 6, offset: 3}}>*/}
                {/*<button onClick={this.sendAward.bind(this)}>Out of Form</button>*/}
                {/*</Col>*/}
            </Container>
        );
    }
}

export default UserCreateAward;