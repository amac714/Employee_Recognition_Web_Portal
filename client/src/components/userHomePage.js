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
                </Row>
            </div>
        );
    }
}

export default UserHomePage;