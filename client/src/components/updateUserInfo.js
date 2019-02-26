import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Row} from 'reactstrap';
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

        if(this.confirmNonEmptyFields()){
            this.props.updateAccount(this.state);
        }else{
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
                    <Col xs="12" style={{border: '1px solid red'}}>
                        <h1>Update Account Information</h1>

                        <Form>
                            <Col sm="12" md={{size: 6, offset: 3}}>
                                <h4>New Info</h4>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        placeholder="first name"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        placeholder="last name"
                                        value={this.state.last_name}
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
            </Container>
        );
    }
}

export default UpdateUserInfo;
