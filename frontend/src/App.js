import React, { Component } from 'react';
import './App.css';
import Customer from './Customer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Create from './Create';


class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            
            <Route path='/' exact={true} component={Customer}/>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/create' exact={true} component={Create}/>

          </Switch>
        </Router>
    )
  }
}

export default App;