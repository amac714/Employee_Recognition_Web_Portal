import React, {Component} from 'react';
import './sideSection.css';

class Date extends Component {

    render() {

        return (
            <div className="dateText">
                <p>{this.props.currentDate}</p>
            </div>
        );
    }
}

export default Date;