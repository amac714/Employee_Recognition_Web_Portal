import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';
import UserLogin from './components/userLogin';
import Header from './components/header';
import AdminLogin from './components/adminLogin';
import ErrorPage from './components/error';
import HomePage from './components/home';
import ViewUsers from './components/adminViewUsers';
import UserHomePage from './components/userHomePage';
import Login from './components/login';
import UpdateUserInfo from './components/updateUserInfo';
import AdminDashboard from './components/adminDashboard';
import DesignAward from "./components/designAward";
import CreateAdmin from './components/createAdmin';
import EditAdmin from './components/editAdmin';
import CreateUser from './components/createUser';


export const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Header />
          <Switch>
            {/* Add routes here */}
            <Route exact path="/" component={HomePage} />
            <Route path="/userLogin" component={UserLogin} />
            <Route path="/userHomePage" component={UserHomePage}/>
            <Route exact path="/admin" component={AdminLogin}/>
            <Route path="/adminDash" component={AdminDashboard} />
            <Route path="/addAdmin" component={CreateAdmin} />
            <Route path="/editAdmin" component={EditAdmin} />
            <Route path="/createUser" component={CreateUser} />
            <Route path="/adminViewUsers" component={ViewUsers} />
            <Route path="/updateUserInfo" component={UpdateUserInfo} />
            <Route path="/designAward" component={DesignAward}/>
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
