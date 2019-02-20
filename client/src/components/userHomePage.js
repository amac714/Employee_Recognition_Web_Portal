/*
 * Description: The home page of the user.
 * */

import React, {Component} from 'react';
import SideSection from './sideSection';
import {Row, Col} from 'reactstrap';
import UserCreateAward from './userCreateAward';
import UserViewGivenAwards from './userViewGivenAwards';
import DateSection from './sideViewComponents/date'
import StatsSection from './sideViewComponents/stats'
import UserAccountInfoSection from './sideViewComponents/userAccountInfo'
import axios from 'axios';
import {Link} from 'react-router-dom';


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
            awardData: {
                numberOfAwardsGiven: 0,
                employeeOfTheWeek: 0,
                employeeOfTheMonth: 0,
            },
            displayType: 'homepage',
            dateData: {
                currentDate: currentDate,
                currentDay: currentDay,
            },
            // currentDate: currentDate,
            // currentDay: currentDay,
            id: localStorage.getItem('id'),
            award_type: '',
            first_name: '',
            last_name: '',
            time_granted: '',
            date_granted: '',
            currentUserData: {
                user_first_name: '',
                user_last_name: '',
            },
            config: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
            },
        };
    }


    componentDidMount() {
        this.getAwards();
        this.timer = setInterval(() => this.getAwards(), 5000);
    }

    componentWillUnmount() {
        this.timer = null;
    }


    /*
    * Description: Makes call to endpoint getting all of the awards given by the user. Will pass the web token to the endpoint for authentication.
    */
    getAwards = () => {
        var weekAwardCount = 0;
        var monthAwardCount = 0;

        axios
            .get('/user/' + this.state.id + '/award', this.state.config)
            .then(res => {
                res.data.forEach(function (item) {
                    if (item.award_type === "Week") {
                        weekAwardCount++;
                    } else if (item.award_type === "Month") {
                        monthAwardCount++;
                    }
                });

                let awardDataCopy = this.state.awardData;
                awardDataCopy['numberOfAwardsGiven'] = res.data.length;
                awardDataCopy['employeeOfTheWeek'] = weekAwardCount;
                awardDataCopy['employeeOfTheMonth'] = monthAwardCount;

                this.setState({
                    awards: res.data,
                    awardData: awardDataCopy,
                })
            }) // If user is authenticated, store the returned awards
            .catch(err => console.log(err)); // User is not authenticated
    };


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
                console.log(res);
                console.log(res.data);
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

    changeDisplay = () => {
        if (this.state.displayType === "homepage") {
            this.setState({
                displayType: 'updateUserInfo'
            })
        } else {
            this.setState({
                displayType: 'homepage'
            })
        }

    };

    // updateAccount = e => {
    //
    //     axios
    //         .patch(
    //             '/user/' + this.state.id,
    //             {
    //                 first_name: this.state.first_name,
    //                 last_name: this.state.last_name,
    //             },
    //             this.state.config
    //         )
    //
    //         .then(res => {
    //             console.log(res);
    //             this.props.history.push('/userHomePage');
    //         })
    //         .catch(err => console.log(err));
    // };


    render() {
        const display = this.state.displayType;
        let displayPage;
        let displayAwardData;

        if (display === "homepage") {
            displayPage =
                <div>
                    <UserCreateAward
                        clearForm={this.state.sent}
                        submitAward={this.submitAward}
                    />
                </div>;
            displayAwardData =
                <div>
                    <UserViewGivenAwards awards={this.state.awards}/>
                </div>
        } else if (display === "updateUserInfo") {
            displayPage =
                <div>
                    <UserAccountInfoSection

                    />
                </div>
        }

        return (
            <div>
                <Row>

                    <Col xs="2" style={{border: '1px solid black'}}>
                        <DateSection
                            date={this.state.dateData}
                        />

                        <UserAccountInfoSection/>

                        <button onClick={this.changeDisplay}>Update Account</button>

                        <StatsSection
                            awardData={this.state.awardData}
                        />

                    </Col>


                    {this.state.displayType === "homepage" &&
                    <Col xs="5" style={{border: '1px solid red'}}>
                        {displayPage}
                    </Col>
                    }

                    {this.state.displayType === "homepage" &&
                    <Col xs="5" style={{border: '1px solid green'}}>
                        {displayAwardData}
                    </Col>
                    }

                    {this.state.displayType === "updateUserInfo" &&
                    <Col xs="10" style={{border: '1px solid blue'}}>
                        {displayPage}
                    </Col>
                    }
                </Row>
            </div>
        );
    }
}

export default UserHomePage;


