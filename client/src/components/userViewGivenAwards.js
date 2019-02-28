/*
 * Description: Displays the awards given by the user to the screen.
 * */

import React, {Component} from 'react';
import {Table} from 'reactstrap';
import Container from "reactstrap/es/Container";

class UserViewMyAwards extends Component {

    /*
    * Description: Will send the award id to parent (userHomePage.js) and delete that award
    * */
    deleteAward = (e) => {

        if (window.confirm("Confirm Delete")) {
            this.props.deleteAward(e)
        } else {
            console.log("I'm done")
        }


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
        var time_of_day;
        var hour = time_granted.substr(0,2);
        const min = time_granted.substr(2,3);

        if(hour > 12){
            time_of_day = "PM";
            hour -= 12;
        }
        else{
            time_of_day = "AM"
        }

        const time_given = hour + min + " " + time_of_day;
        return (
            <tr key={id} className="award_data">
                <th scope="row">{award_type}</th>
                <th>{recipient_first_name}</th>
                <th>{recipient_last_name}</th>
                <th>{date_granted}</th>
                <th>{time_given}</th>
                <th>
                    <button type="button" onClick={() => this.deleteAward(id)}>Delete</button>
                </th>
            </tr>
        );
    };


    render() {
        return (
            <Container>
                <h2 className="text-center section_header">Given Awards</h2>
                <Table bordered striped responsive className="text-center award_table">
                    <thead>
                    <tr>
                        <th>Award Type</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date Given</th>
                        <th>Time Given</th>
                        <th>Delete Award</th>
                    </tr>
                    </thead>
                    <tbody>{this.props.awards.map(this.getAwardData)}</tbody>
                </Table>
            </Container>
        );
    }
}

export default UserViewMyAwards;
