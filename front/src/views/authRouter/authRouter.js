import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Error from './authError'
import Home from './authHome'
import Index from './authIndex'
import Signup from './authSignup'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/auth/error" component={Error} />
    <Route exact path="/auth/home" component={Home} />
    <Route exact path="/auth/" component={Index} />
    <Route exact path="/auth/signup" component={Signup} />
  </Switch>
)

export default TemplateRouter