import React, {Component} from 'react';
import axios from 'axios';


class UserViewMyAwards extends Component {
    constructor() {
        super();

        this.state = {
          awards: []
        }
    }

    componentDidMount() {
        this.getAwards();
    }

    getAwards = () => {
        const userId = 6;
        const token = localStorage.getItem('token');
        let config = {
            headers: {'Authorization': `Bearer ${token}`}
        };

        var url = 'http://localhost:5000/user/' + userId + '/award';
        axios.get(url, config)
        .then(res => this.setState({ awards: res.data }))
        .catch(err => console.log(err));

        console.log(this.state.awards);
    };

      // getAdmins = () => {
      //   let token = localStorage.getItem('access_token');
      //   let config = {
      //     headers: {'Authorization': `Bearer ${token}`}
      //   }
      //   axios.get('/admin', config)
      //   .then(res => this.setState({ admins: res.data }))
      //   .catch(err => console.log(err));
      // }



    render() {
        return (
            <div>
                <h1>Given Awards</h1>
                <p>{this.state.awards}</p>
            </div>
        );
    }
}

export default UserViewMyAwards;