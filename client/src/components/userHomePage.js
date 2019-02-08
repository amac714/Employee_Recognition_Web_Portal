import React, {Component} from 'react';
import SideSection from './sideSection';
import { Row, Col } from 'reactstrap';
import UserViewMyAwards from './userViewMyAwards';
import UserViewGivenAwards from './userViewGivenAwards';

class UserHomePage extends Component {
    constructor(props) {
        super(props);

        const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const day = new Date(),
            currentDay = dayName[day.getDay()];

        const today = new Date(),
            currentDate = monthName[(today.getMonth())] + ' ' + today.getDate() + ", " + today.getFullYear();


        this.state = {
            userType: "user",
            currentDate: currentDate,
            currentDay: currentDay,
        }
    }



    render() {
        return (
            <div>
                <Row>
                    <Col xs="2" style={{border: "1px solid black"}}>
                        <SideSection
                            userType={this.state.userType}
                            currentDate={this.state.currentDate}
                            currentDay={this.state.currentDay}
                        />
                    </Col>

                    <Col xs="5" style={{border: "1px solid red"}}>
                        <UserViewMyAwards />
                    </Col>

                    <Col xs="5" style={{border: "1px solid green"}}>
                        <UserViewGivenAwards />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserHomePage;