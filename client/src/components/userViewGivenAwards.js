import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
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

    getAwards = () => {

        axios.get('http://localhost:5000/user/6/award', this.state.config)
            .then(res => this.setState({awards: res.data}))
            .catch(err => console.log(err));
    };

    getAwardData = ({id, award_type, recipient_first_name, recipient_last_name, date_granted, time_granted}) => {
        // const edit = {
        //     pathname: '/editAdmin',
        //     state: {
        //         id: `${id}`,
        //         first_name: `${first_name}`,
        //     }
        // }
        console.log();
        return (
            <tr key={id}>
                <th scope="row">{award_type}</th>
                <th>{recipient_first_name}</th>
                <th>{recipient_last_name}</th>
                <th>{date_granted}</th>
                <th>{time_granted}</th>
                {/*<th><Link to={edit}>Update</Link></th>*/}
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