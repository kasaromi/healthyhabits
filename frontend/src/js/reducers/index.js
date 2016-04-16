import { combineReducers } from 'redux'
import CheckUserReducer from './checkUserReducer.js'

export default combineReducers({
  thing: CheckUserReducer
})
