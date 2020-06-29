import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import authRouter from './views/authRouter'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={(props) =>
                  <Redirect to="/auth" />
              }
            />
            <Route path="/auth" component={authRouter} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
