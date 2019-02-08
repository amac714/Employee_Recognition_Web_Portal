import React, {Component} from 'react';
import axios from 'axios';


class UserViewMyAwards extends Component {
    constructor() {
        super();

        this.state = {
          admins: []
        }
    }

    componentDidMount() {
        this.getAdmins();
    }

    getAdmins = () => {
        var url = 'http://localhost:5000' + '/award';
        axios.get('http://localhost:5000/admin')
        .then(res => this.setState({ admins: res.data }))
        .catch(err => console.log(err));
    };



    render() {
        return (
            <div>
                <h1>My Awards</h1>
                <p>test</p>
            </div>
        );
    }
}

export default UserViewMyAwards;