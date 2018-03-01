import { combineReducers } from 'redux';
import cookbook from './cookbook/reducer'
import nav from './nav'
import cookbookDetail from './cookbookDetail/reducer'

export default combineReducers({
  cookbook,
  nav,
  cookbookDetail,
})
