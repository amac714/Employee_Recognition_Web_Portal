/*
 * Description: The first page any user lands on.
 * */

import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import './homePage.css';
import {Link} from 'react-router-dom';
//import Container from "reactstrap/es/Container";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            textTitle: 'Recognize Great Work',
            textMessage:
                "Cough hairball on conveniently placed pants pet my belly, you know you want to; seize the hand and shred it!,  sit and stare or your pillow is now my pet bed, so bite off human's toes ignore the human until she needs to get up, then climb on her lap and sprawl or lies down",
        };
    }

    componentDidMount() {
        axios
            .get('/')
            .then(res => {
                console.log(res);
                this.setState({msg: res.data.data});
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="home">
                <div className="home--login">
                    <h1 className="home--title">{this.state.textTitle}</h1>
                    <Link to="/userLogin">
                        <Button className="home--button" color="primary" size="lg">Login</Button>
                    </Link>
                </div>
            </div>
            // <Container>
            //     <div className="home">
            //         <h1>{this.state.textTitle}</h1>
            //         <Link to="/userLogin">
            //             <button>Login</button>
            //         </Link>
            //     </div>

            //     <Row className="content">
            //         <Col xs={{size: 4, offset: 1}} style={{paddingTop: '200px'}}>
            //             <h1 className="headerText">{this.state.textTitle}</h1>
            //             <p>{this.state.textMessage}</p>
 
            //             <div className="buttons">
            //                 <Link to="/userLogin">
            //                     <button>Login</button>
            //                 </Link>
            //             </div>
            //         </Col>
            //         <Col xs={{size: 1, offset: 2}}>
            //             <a href="https://placeholder.com">
            //                 <img src="/images/homeImage.jpg" alt="firstImg" style={{height: '300px', width: '500px'}}/>
            //             </a>
            //         </Col>
            //     </Row>

            //     <Row>
            //         <Col xs={{size: 2, offset: 7}}>
            //             <a href="https://placeholder.com">
            //                 <img src="https://via.placeholder.com/500x300" alt="secondImg"/>
            //             </a>
            //         </Col>
            //     </Row>
            // </Container>
        );
    }
}

export default HomePage;
