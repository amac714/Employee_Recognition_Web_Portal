import React, {Component} from 'react';
import SideSection from './sideSection';
import { Container, Row, Col } from 'reactstrap';


class UserHomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userType: "user",
        }
    }


    render() {
        return (
            <div>
                <Row>
                    <Col xs="2" style={{border: "1px solid black"}}>
                        <SideSection userType={this.state.userType}/>
                    </Col>

                    <Col xs="5" style={{border: "1px solid red"}}>
                        <h1>My Awards</h1>
                    </Col>

                    <Col xs="5" style={{border: "1px solid green"}}>
                        <h1>Submitted Awards</h1>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserHomePage;