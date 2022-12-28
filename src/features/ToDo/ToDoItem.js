import { useSelector, useDispatch } from 'react-redux'

import { toggleToDo, deleteToDo, selectToDoById } from './toDoSlice'

const ToDoItem = ({ id }) => {
  const { title, isDone } = useSelector((state) => selectToDoById(state, id))
  // const { title, isDone } = useSelector(({ toDoList }) => toDoList.entities[id])
  const dispatch = useDispatch()

  const handleChange = (id) => dispatch(toggleToDo(id))
  const handleDelete = (id) => dispatch(deleteToDo(id))

  return (
    <div className="row g-0">
      <div className="col-auto">
        <button
          type="button"
          className="btn btn-default"
          onClick={() => handleChange(id)}
        >
          <i className={`bi text-white ${isDone ? 'bi-check-square' : 'bi-square'}`} />
        </button>
      </div>

      <div className="col text-start text-break">{title}</div>

      <div className="col-auto">
        <button
          type="button"
          className="btn btn-default"
          onClick={() => handleDelete(id)}
        >
          <i className="bi bi-trash text-white" />
        </button>
      </div>
    </div>
  )
}

export default ToDoItem
