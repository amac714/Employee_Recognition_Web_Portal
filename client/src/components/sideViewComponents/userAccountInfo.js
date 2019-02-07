import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class UserAccountInfo extends Component {
    render() {
        return (
            <div>
                <p>Username: {localStorage.getItem('username')}</p>
                <p>Signature Image</p>
                <Link to="/updateUserInfo">
                    <button>Update</button>
                </Link>
            </div>
        );
    }
}

export default UserAccountInfo;