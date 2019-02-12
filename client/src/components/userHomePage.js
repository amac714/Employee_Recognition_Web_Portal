/*
* Description: The home page of the user.
* */


import React, {Component} from 'react';
import SideSection from './sideSection';
import { Row, Col } from 'reactstrap';
import UserCreateAward from './userCreateAward';
import UserViewGivenAwards from './userViewGivenAwards';


class UserHomePage extends Component {
    constructor(props) {
        super(props);

        // Arrays used in generating dates
        const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // Get the day (i.e. Monday, Friday) of the week
        const day = new Date(),
            currentDay = dayName[day.getDay()];

        // Get the month, day (i.e. 29), year
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
                        <UserCreateAward />
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