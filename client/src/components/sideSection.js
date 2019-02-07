import React, {Component} from 'react';
import Date from './sideViewComponents/date';
import UserAccountInfo from './sideViewComponents/userAccountInfo'
import Stats from './sideViewComponents/stats'


function SideSection(props){
    return (
      <div>
          <Date
            currentDate={props.currentDate}
            currentDay={props.currentDay}
          />

          {props.userType === "user" && <UserAccountInfo/>}

          <Stats/>
      </div>
    );
}

export default SideSection;