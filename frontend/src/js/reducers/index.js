import { combineReducers } from 'redux'
import CheckUserReducer from './checkUserReducer.js'

export default combineReducers({
  checkUser: CheckUserReducer
})
