import { combineReducers } from 'redux'
import toDoList from './toDoList'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  toDoList,
  visibilityFilter
})