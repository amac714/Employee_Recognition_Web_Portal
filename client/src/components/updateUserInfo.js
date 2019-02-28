import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Container from "reactstrap/es/Container";


class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.currentData.first_name,
            last_name: this.props.currentData.last_name,
        })
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };


    handleSubmit = () => {
        let {new_password1, new_password2} = this.state;

        if (this.confirmNonEmptyFields()) {
            this.props.updateAccount(this.state);
        } else {
            alert("Cannot have empty fields")
        }
    };


    confirmNonEmptyFields = () => {
        const {first_name, last_name} = this.state;

        if (first_name.length === 0 || last_name.length === 0) {
            return false
        } else {
            return true
        }
    };

    render() {
        return (
            <Container>
                <Row>
                    <div className="login--form">
                        <div className="login--inner">
                            <Col xs="12">
                                <h1 className="text-center section_header">Update Account Information</h1>

                                <Form>
                                    <FormGroup row>
                                        <Label sm={4} className="input_text">First Name:</Label>
                                        <Col sm={8}>
                                            <Input
                                                className="input--login"
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                placeholder="first name"
                                                value={this.state.first_name}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label sm={4} className="input_text">Last Name:</Label>
                                        <Col sm={8}>
                                            <Input
                                                className="input--login"
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                placeholder="last name"
                                                value={this.state.last_name}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <div className="submit_button">
                                        <Button type="button" color="primary" className="input--login" onClick={this.handleSubmit}>Submit</Button>
                                    </div>
                                </Form>
                            </Col>
                        </div>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default UpdateUserInfo;
