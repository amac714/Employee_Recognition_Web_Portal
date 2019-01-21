import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';
import UserLogin from './components/userLogin';
import Header from './components/header';
import AdminLogin from './components/adminLogin';
import ErrorPage from './components/error';
import HomePage from './components/home';

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
            <Route path="/user" component={UserLogin} />
            <Route path="/admin" component={AdminLogin}/>
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
