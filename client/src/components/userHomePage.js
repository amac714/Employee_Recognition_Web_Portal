/*
 * Description: The home page of the user.
 * */

import React, {Component} from 'react';
import SideSection from './sideSection';
import {Row, Col} from 'reactstrap';
import UserCreateAward from './userCreateAward';
import UserViewGivenAwards from './userViewGivenAwards';
import axios from 'axios';


class UserHomePage extends Component {
    constructor(props) {
        super(props);

        // Arrays used in generating dates
        const monthName = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const dayName = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        // Get the day (i.e. Monday, Friday) of the week
        const day = new Date(),
            currentDay = dayName[day.getDay()];

        // Get the month, day (i.e. 29), year
        const today = new Date(),
            currentDate =
                monthName[today.getMonth()] +
                ' ' +
                today.getDate() +
                ', ' +
                today.getFullYear();

        this.state = {
            userType: 'user',
            currentDate: currentDate,
            currentDay: currentDay,
            id: localStorage.getItem('id'),
            award_type: '',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
            config: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            },
        };
    }


    submitAward = (e) => {
        // Send award data
        axios
            .post(
                'http://localhost:5000/user/' + this.state.id + '/award',
                {
                    award_type: e.award_type,
                    first_name: e.first_name,
                    last_name: e.last_name,
                    time_granted: e.time_granted,
                    date_granted: e.date_granted,
                },
                this.state.config
            )
            .then(res => {
                // console.log(res)
                this.setState({
                    award_type: 'week',
                    first_name: '',
                    last_name: '',
                    time_granted: '',
                    date_granted: '',
                });

                // alert("Award Created!!!");
                console.log(this.props.history);
                alert("ST")
                // this.props.history.push('/userHomePage');
            })

            .catch(function (error) {
                console.log(error);
            });
    };


    render() {
        return (
            <div>
                <Row>
                    <Col xs="2" style={{border: '1px solid black'}}>
                        <SideSection
                            userType={this.state.userType}
                            currentDate={this.state.currentDate}
                        />
                    </Col>

                    <Col xs="5" style={{border: '1px solid red'}}>
                        <UserCreateAward
                            submitAward={this.submitAward}
                        />
                    </Col>

                    <Col xs="5" style={{border: '1px solid green'}}>
                        {/*<UserViewGivenAwards/>*/}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserHomePage;