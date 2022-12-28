import { useSelector, useDispatch } from 'react-redux'

import { toggleToDo, deleteToDo, selectToDoById } from './toDoSlice'

function ToDoItem({ id }) {
  const { title, isDone } = useSelector((state) => selectToDoById(state, id))
  const dispatch = useDispatch()

  const handleChange = () => dispatch(toggleToDo(id))
  const handleDelete = () => dispatch(deleteToDo(id))

  return (
    <div className="row g-0">
      <div className="col-auto">
        <button
          type="button"
          className="btn btn-default"
          onClick={handleChange}
        >
          <i className={`bi text-white ${isDone ? 'bi-check-square' : 'bi-square'}`} />
        </button>
      </div>

      <div className="col text-start text-break">{title}</div>

      <div className="col-auto">
        <button
          type="button"
          className="btn btn-default"
          onClick={handleDelete}
        >
          <i className="bi bi-trash text-white" />
        </button>
      </div>
    </div>
  )
}

export default ToDoItem
