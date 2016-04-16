import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'
import routes from './routes.js'
import reducers from './reducers/index.js'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), document.getElementById('app'))
