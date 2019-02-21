import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Row} from 'reactstrap';
import axios from 'axios';


class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            new_first_name: '',
            new_last_name: '',
            new_username: '',
            new_password1: '',
            new_password2: '',
            current_username: '',
            current_password: '',
        };
        this.clearForm = this.clearForm.bind(this);
    }

    // getUserData = () => {
    //
    // }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };


    handleSubmit = () => {
        const {new_password1, new_password2, new_first_name, new_last_name, new_username} = this.state;
        const {cur_first_name, cur_last_name, cur_username, user_password} = this.props;

        //Check if new passwords match
        if (new_password1 !== new_password2) {
            alert("You're new passwords did not match, please try again.");
            this.clearForm()
        } else {
            //check if a new first name has been entered
            if (new_first_name === '') {
                this.setState({new_first_name: cur_first_name})
            }

            //check if a new last name has been entered
            if (new_last_name === '') {
                this.setState({new_last_name: cur_last_name})
            }

            //check if a new user name has been entered
            if (new_username === '') {
                this.setState({new_username: cur_username})
            }

            if (new_password1 === '') {
                this.setState( {new_password1: user_password})
            }
        }


        this.props.updateAccount(this.state);

    };


    clearForm = () => {
        this.setState({
            first_name: '',
            last_name: '',
            new_username: '',
            new_password: '',
            current_username: '',
            current_password: '',
        })
    };


    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" style={{border: '1px solid red'}}>
                        <h1>Update Account Information</h1>

                        <Form>
                            <Col sm="12" md={{size: 6, offset: 3}}>
                                <h4>New Info</h4>
                                <FormGroup>
                                    {/*<Label>New First Name</Label>*/}
                                    <Input
                                        type="text"
                                        name="new_first_name"
                                        id="new_first_name"
                                        placeholder="first name"
                                        value={this.state.new_first_name}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    {/*<Label>New Last Name</Label>*/}
                                    <Input
                                        type="text"
                                        name="new_last_name"
                                        id="new_last_name"
                                        placeholder="last name"
                                        value={this.state.new_last_name}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    {/*<Label>New Username</Label>*/}
                                    <Input
                                        type="text"
                                        name="new_username"
                                        id="new_username"
                                        placeholder="New Username"
                                        value={this.state.new_username}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    {/*<Label>New Password</Label>*/}
                                    <Input
                                        type="password"
                                        name="new_password1"
                                        id="new_password1"
                                        placeholder="New Password"
                                        value={this.state.new_password1}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    {/*<Label>Confirm New Password</Label>*/}
                                    <Input
                                        type="password"
                                        name="new_password2"
                                        id="new_password2"
                                        placeholder="New Password"
                                        value={this.state.new_password2}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>

                                <br/>
                                <h3>Confirm</h3>
                                <FormGroup>
                                    {/*<Label>Confirm Password</Label>*/}
                                    <Input
                                        type="text"
                                        name="current_username"
                                        id="current_username"
                                        placeholder="current username"
                                        value={this.state.current_username}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    {/*<Label>Confirm Password</Label>*/}
                                    <Input
                                        type="password"
                                        name="current_password"
                                        id="current_password"
                                        placeholder="current password"
                                        value={this.state.current_password}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>

                            </Col>
                            <Col sm="12" md={{size: 6, offset: 3}}>
                                <Button type="button" onClick={this.handleSubmit}>Submit</Button>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UpdateUserInfo;
