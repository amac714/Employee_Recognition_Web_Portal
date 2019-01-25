import React, {Component} from 'react';

class UserAccountInfo extends Component {
    render() {
        return (
            <div>
                <p>Username: testName</p>
                <p>Password: ******</p>
                <p>Signiture Image</p>
                <button>Update Info</button>
            </div>
        );
    }
}

export default UserAccountInfo;