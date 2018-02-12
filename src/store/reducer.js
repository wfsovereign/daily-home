import { combineReducers } from 'redux';
import cookbook from './cookbook/reducer'
import nav from './nav'

export default combineReducers({
  cookbook,
  nav,
})
