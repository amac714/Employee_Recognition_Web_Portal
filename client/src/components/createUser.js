import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, 
        Input, Col, Label, FormFeedback, Alert } from 'reactstrap';
import axios from 'axios';

class CreateUser extends Component {
  constructor(){
    super();
    this.state = {
      user_name: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPW: '',
      sig: '',
      prevImg: ''
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onImageChange = (e) => {
    this.setState({sig: e.target.files[0]})
    console.log(this.state.sig);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', this.state.user_name);
    formData.append('password', this.state.password);
    formData.append('first_name', this.state.first_name);
    formData.append('last_name', this.state.last_name);
    formData.append('sig', this.state.sig);
    // let token = localStorage.getItem('access_token');
    // let config = {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }
    axios.post('/user', formData)
    .then((res) => {
      console.log(res);
      //this.props.history.push('/adminDash');
    })
    .catch(err => console.log(err))
    
  }

  render() {
    let { prevImg } = this.state;
    let $prevImg = null;
    if(prevImg) {
      $prevImg = (<img alt="prev" src={prevImg}/>)
    } else {
      $prevImg = (<div>Preview Image</div>)
    }
    return (
      <div>
        <Container>
         <Form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              name="user_name"
              value={this.state.user_name}
              placeholder="Enter email"
              onChange={this.onChange}
            />
            <Input
              type="text"
              name="first_name"
              value={this.state.first_name}
              placeholder="Enter first name"
              onChange={this.onChange}
            />
            <Input
              type="text"
              name="last_name"
              value={this.state.last_name}
              placeholder="Enter last name"
              onChange={this.onChange}
            />
            <Input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter password"
              onChange={this.onChange}
            />
            <Input
              type="file"
              name="sig"
              onChange={this.onImageChange}
            />
            <Button type="submit">Submit</Button>
         </Form>
          {$prevImg}
        </Container>
      </div>
    )
  }
}

export default CreateUser;