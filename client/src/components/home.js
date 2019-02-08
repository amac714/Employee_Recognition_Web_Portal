import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import './homePage.css'
import { Link } from 'react-router-dom';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      textTitle: 'Recognize Great Work',
      textMessage: 'Cough hairball on conveniently placed pants pet my belly, you know you want to; seize the hand and shred it!,  sit and stare or your pillow is now my pet bed, so bite off human\'s toes ignore the human until she needs to get up, then climb on her lap and sprawl or lies down',
    };
  }




  //feel free to change or delete
  componentDidMount() {
    axios.get('http://localhost:5000/')
      .then(res => {
        console.log(res);
        this.setState({ msg: res.data.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>{this.state.msg}</h1>

          <Row className="content">
              <Col xs={{size: 4, offset: 1}} style={{paddingTop: "200px"}}>
                <h1 className="headerText">{this.state.textTitle}</h1>
                <p>{this.state.textMessage}</p>

                <div className="buttons">
                    <Link tag={Link} to="/"><button>Signup</button></Link>
                    <Link tag={Link} to="/userLogin"><button>Login</button></Link>
                </div>
              </Col>
              <Col xs={{offset: 2 }}>
                <a href="https://placeholder.com"><img src="https://via.placeholder.com/500x300" alt="firstImg"/></a>
              </Col>
          </Row>

          <Row>
            <Col xs={{offset: 7}} >
              <a href="https://placeholder.com"><img src="https://via.placeholder.com/500x300"/></a>
            </Col>
          </Row>
      </div>
    );
  }
}

export default HomePage;