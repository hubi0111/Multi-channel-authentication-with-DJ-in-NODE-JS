import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import indexComponent from './components/indexComponent'
import profileComponent from './components/profileComponent'
import loginComponent from './components/loginComponent'
import signupComponent from './components/signupComponent'
import errorComponent from './components/errorComponent'

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={indexComponent} exact/>
             <Route path="/profile" component={profileComponent} />
             <Route path="/signup" component={signupComponent} />
             <Route path="/login" component={loginComponent} />
             <Route path="/error" component={errorComponent} />
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
