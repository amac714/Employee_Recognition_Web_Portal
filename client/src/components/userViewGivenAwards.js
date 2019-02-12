/*
* Description: Displays the awards given by the user to the screen.
* */

import React, {Component} from 'react';
import axios from 'axios';
import {Table} from "reactstrap";


class UserViewMyAwards extends Component {
    constructor() {
        super();

        this.state = {
            awards: [],
            id: '',
            first_name: '',
            config: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            }
        }
    }

    componentDidMount() {
        this.getAwards();
    }

    /*
    * Description: Makes call to endpoint getting all of the awards given by the user. Will pass the web token to the endpoint for authentication.
    * */
    getAwards = () => {
        axios.get('http://localhost:5000/user/6/award', this.state.config)
            .then(res => this.setState({awards: res.data}))     // If user is authenticated, store the returned awards
            .catch(err => console.log(err));                          // User is not authenticated
    };


    /*
    *  Description: Format how the awards are displayed to the screen.
    * */
    getAwardData = ({id, award_type, recipient_first_name, recipient_last_name, date_granted, time_granted}) => {
        console.log();
        return (
            <tr key={id}>
                <th scope="row">{award_type}</th>
                <th>{recipient_first_name}</th>
                <th>{recipient_last_name}</th>
                <th>{date_granted}</th>
                <th>{time_granted}</th>
            </tr>
        );
    };

    render() {
        return (
            <div>
                <h1>Given Awards</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Award Type</th>
                        <th>Recipient First Name</th>
                        <th>Recipient Last Name</th>
                        <th>Date Given</th>
                        <th>Time Given</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.awards.map(this.getAwardData)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UserViewMyAwards;