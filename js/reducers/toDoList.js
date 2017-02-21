import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actions'

const todo = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        isDone: false
      }
    case TOGGLE_TODO:
      if (state.id === action.id)
        return Object.assign({}, state, {
          isDone: !state.isDone
      })
    default:
      return state
  }
}

export default function toDoList(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]

    case TOGGLE_TODO:
      return state.map(toDoItem => todo(toDoItem, action))

    case REMOVE_TODO:
      return state.filter(toDoItem => {
        return toDoItem.id !== action.id
      })

    default:
      return state
  }
}
