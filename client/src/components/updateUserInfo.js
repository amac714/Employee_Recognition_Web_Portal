import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Container from 'reactstrap/es/Container';

class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            visible: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            first_name: this.props.currentData.first_name,
            last_name: this.props.currentData.last_name,
        });
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = () => {
        let {new_password1, new_password2} = this.state;

        if (this.confirmNonEmptyFields()) {
            this.props.updateAccount(this.state);
        } else {
            this.setState({visible: true})
        }
    };

    confirmNonEmptyFields = () => {
        const {first_name, last_name} = this.state;

        if (first_name.length === 0 || last_name.length === 0) {
            return false;
        } else {
            return true;
        }
    };

    render() {
        return (
            <Container>
                <Alert
                    color="warning"
                    isOpen={this.state.visible}
                    className="form--alert"
                >
                    Cannot have empty fields
                </Alert>
                <Row>
                    <div className="login--form">
                        <div className="login--inner">
                            <Col xs="12">
                                <h1 className="text-center section_header">
                                    Update Account Information
                                </h1>

                                <Form>
                                    <FormGroup row>
                                        <Label sm={4} className="input_text">
                                            First Name:
                                        </Label>
                                        <Col sm={8}>
                                            <Input
                                                className="input--form"
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
                                        <Label sm={4} className="input_text">
                                            Last Name:
                                        </Label>
                                        <Col sm={8}>
                                            <Input
                                                className="input--form"
                                                type="text"
                                                name="last_name"
                                                id="last_name"
                                                placeholder="last name"
                                                value={this.state.last_name}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <Row>
                                        <Col sm={{size: 1, offset: 3}}>
                                            <Button
                                                type="button"
                                                color="success"
                                                className="button_style submit_create_award"
                                                onClick={this.handleSubmit}
                                            >
                                                Submit
                                            </Button>
                                        </Col>

                                        <Col sm={{size: 1, offset: 2}}>
                                            <Button
                                                type="button"
                                                className="button_style cancel_create_award"
                                                onClick={this.props.cancelInput}
                                            >
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
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
