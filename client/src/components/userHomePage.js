/*
 * Description: The home page of the user.
 * */

import React, {Component} from 'react';
import SideSection from './sideSection';
import {Table, Row, Col, Alert, Container} from 'reactstrap';
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
            awards: [],
            userType: 'user',
            currentDate: currentDate,
            currentDay: currentDay,
            id: localStorage.getItem('id'),
            award_type: '',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
            sent: false,
            config: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            },
        };
    }


    componentDidMount() {
        this.getAwards();
    }


    /*
    * Description: Makes call to endpoint getting all of the awards given by the user. Will pass the web token to the endpoint for authentication.
 * */
    getAwards = () => {
        axios
            .get('/user/' + this.state.id + '/award', this.state.config)
            .then(res => this.setState({awards: res.data})) // If user is authenticated, store the returned awards
            .catch(err => console.log(err)); // User is not authenticated
    };


    submitAward = (e) => {
        // console.log(e);
        //e.preventDefault();
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
                //alert("In Then");
                console.log(res);
                console.log(res.data);
                this.setState({sent: false});
                this.renderPage();
                this.props.history.push('/userHomePage'); //route to user homepage
                this.getAwards()

            })
            .catch(function (error) {
                //alert("In Catch");
                console.log(error);
            });

    };

    /**/
    renderPage = () => {
        this.setState({
            award_type: '',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
        })
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
                            clearForm={this.state.sent}
                            submitAward={this.submitAward}
                        />
                    </Col>

                    <Col xs="5" style={{border: '1px solid green'}}>
                        <UserViewGivenAwards awards={this.state.awards}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserHomePage;


