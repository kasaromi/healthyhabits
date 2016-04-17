import { combineReducers } from 'redux'
import addActionReducer from './addActionReducer.js'

export default combineReducers({
  habits: addActionReducer
})
