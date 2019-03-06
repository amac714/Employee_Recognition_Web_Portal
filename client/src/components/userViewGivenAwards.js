/*
 * Description: Displays the awards given by the user to the screen.
 * */

import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import Container from "reactstrap/es/Container";

class UserViewMyAwards extends Component {

    /*
    * Description: Will send the award id to parent (userHomePage.js) and delete that award
    * */
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

        // format time
        let time_of_day;
        let hour = time_granted.substr(0, 2);
        const min = time_granted.substr(2, 3);

        // AM
        if (hour < 12) {
            if (hour === "00") {    //set hour to 12
                hour = 12;
            }
            time_of_day = "AM";
        }
        // PM
        else {
            if (hour === "12") {    //set hour to 12
                hour = 12;
            } else {                //set hour between 1 and 11
                hour -= 12;
            }
            time_of_day = "PM";
        }

        const time_given = hour + min + " " + time_of_day;


        // format date
        const month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const year = date_granted.substr(0, 4);
        const day_month = date_granted.substr(5, 7);
        const month = day_month.substr(0, 2);
        const day_of_the_week = day_month.substr(3, 4);

        const date_given = month_list[parseInt(month) - 1] + " " + day_of_the_week + ", " + year;

        return (
            <tr key={id} className="award_data">
                <th scope="row">{award_type}</th>
                <th>{recipient_first_name} {recipient_last_name}</th>
                <th>{date_given}</th>
                <th>{time_given}</th>
                <th>
                    <Button type="button" color="danger" className="delete_award_button" onClick={() => this.deleteAward(id)}>Delete</Button>
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
                        <th>Recipient</th>
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
