import React from 'react';
import Date from './sideViewComponents/date';
import UserAccountInfo from './sideViewComponents/userAccountInfo';
import Stats from './sideViewComponents/stats';
import {Link} from 'react-router-dom';


function SideSection(props) {
    return (
        <div>
            <Date currentDate={props.currentDate} currentDay={props.currentDay}/>

            <UserAccountInfo/>

            <Link to="/updateUserInfo" currentDate={props.currentDate}>
                <button>Update</button>
            </Link>

            <Stats
                awardData={props.awardData}
            />
        </div>
    );
}

export default SideSection;
