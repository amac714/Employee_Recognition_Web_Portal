import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';
import UserLogin from './components/userLogin';
import Header from './components/header';
import AdminLogin from './components/adminLogin';
import ErrorPage from './components/error';
import HomePage from './components/home';
import AdminMenu from './components/adminMenu';
import ViewUsers from './components/adminViewUsers';
import UserHomePage from './components/userHomePage'

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
            <Route path="/user" component={UserHomePage} />
            <Route exact path="/admin" component={AdminLogin}/>
            <Route path="/admin/menu" component={AdminMenu} />
            <Route path="/admin/viewUsers" component={ViewUsers} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
