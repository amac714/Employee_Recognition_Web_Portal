import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';

class UserAccountInfo extends Component {
    render() {
        return (
            <div>
                <h2 className="text-center"><strong>Account Information</strong></h2>

                <Row className="sideSectionRow">
                    <Col sm="5" className="removeColumnPadding">
                        <p>Username:</p>
                        <p>First Name:</p>
                        <p>Last Name:</p>
                    </Col>

                    <Col sm="7" className="removeColumnPadding">
                        <p><strong className="userData">{this.props.currentUserData.user_name}</strong></p>
                        <p><strong className="userData">{this.props.currentUserData.first_name}</strong></p>
                        <p><strong className="userData">{this.props.currentUserData.last_name}</strong></p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserAccountInfo;
