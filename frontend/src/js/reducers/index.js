import { combineReducers } from 'redux'
import addActionReducer from './addActionReducer.js'
import getUserActions from './getUserActions.js'

export default combineReducers({
  addActionReducer: addActionReducer,
  getUserActions: getUserActions
})
