import React, {Component} from 'react';
import {Container, Button, Form, FormGroup, Input, Col, Label} from 'reactstrap';
import axios from "axios"
import {Redirect} from 'react-router-dom';


class UserLogin extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            userToken: '',
            id: null,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {history} = this.props;


        axios.post('http://localhost:5000/user/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                    this.setState({userToken: res.data.access_token});
                    localStorage.setItem('username', this.state.username);  //store username
                    localStorage.setItem('token', this.state.userToken);    //store user's generated token
                    localStorage.setItem('id', 6);
                    this.props.history.push('/userHomePage');               //route to user homepage
                }
            )
            .catch(function (error) {
                console.log(error)
            });

    };


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };


    render() {
        // if (this.state.userToken !== '') {
        //   return <Redirect to='/userHomePage' />
        // }
        return (
            <Container>
                <Col sm="12" md={{size: 6, offset: 3}}>
                    <h2>Sign In</h2>
                </Col>
                <Form onSubmit={this.handleSubmit}>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="user_id"
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>Password</Label>
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
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <Button>Login</Button>
                    </Col>
                </Form>
            </Container>
        );
    }
}

export default UserLogin;