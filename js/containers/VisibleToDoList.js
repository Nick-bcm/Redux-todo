import { connect } from 'react-redux'
import { toggleToDo, removeToDo } from '../actions'
import ToDoList from '../components/ToDoList'

const getVisibleToDos = (toDoList, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return toDoList
    case 'SHOW_COMPLETED':
      return toDoList.filter(t => t.isDone)
    case 'SHOW_ACTIVE':
      return toDoList.filter(t => !t.isDone)
  }
}

const mapStateToProps = (state) => {
  return {
    toDoList: getVisibleToDos(state.toDoList, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (id) => {
      dispatch(toggleToDo(id))
    },
    onRemove: (id) => {
      dispatch(removeToDo(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList)