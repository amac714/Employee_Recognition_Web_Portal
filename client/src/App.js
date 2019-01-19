import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';
import UserLogin from './components/userLogin';
import Header from './components/header';
import AdminLogin from './components/adminLogin';

export const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={UserLogin} />
            <Route path="/admin" component={AdminLogin}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
