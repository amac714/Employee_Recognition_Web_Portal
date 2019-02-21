/*
 * Description: Displays the awards given by the user to the screen.
 * */

import React, {Component} from 'react';
import {Table} from 'reactstrap';

class UserViewMyAwards extends Component {

    deleteAward = (e) => {
        this.props.deleteAward(e)
    };


    /*
     *  Description: Format how the awards are displayed to the screen.
     * */
    getAwardData = ({
                        id,
                        award_type,
                        recipient_first_name,
                        recipient_last_name,
                        date_granted,
                        time_granted,
                    }) => {
        return (
            <tr key={id}>
                <th scope="row">{award_type}</th>
                <th>{recipient_first_name}</th>
                <th>{recipient_last_name}</th>
                <th>{date_granted}</th>
                <th>{time_granted}</th>
                <th>
                    <button type="button" onClick={() => this.deleteAward(id)}>Delete</button>
                </th>
            </tr>
        );
    };



    render() {

        return (
            <div>
                <h2>Given Awards</h2>
                <Table>
                    <thead>
                    <tr>
                        <th>Award Type</th>
                        <th>Recipient First Name</th>
                        <th>Recipient Last Name</th>
                        <th>Date Given</th>
                        <th>Time Given</th>
                        <th>Delete Award</th>
                    </tr>
                    </thead>
                    <tbody>{this.props.awards.map(this.getAwardData)}</tbody>
                </Table>
            </div>
        );
    }
}

export default UserViewMyAwards;
