import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App.js'
import Login from './components/Login/'
import Habits from './components/Habits/'
import Rewards from './components/Rewards/'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Habits} />
    <Route path='/login' component={Login} />
    <Route path='/rewards' component={Rewards} />
  </Route>
)
