export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

let nextToDoId = 0

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addToDo(text) {
  return {
    type: ADD_TODO,
    id: nextToDoId++,
    text: text
  }
}

export function toggleToDo(id) {
  return {
    type: TOGGLE_TODO,
    id: id
  }
}

export function removeToDo(id) {
  return {
    type: REMOVE_TODO,
    id: id
  }
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}
