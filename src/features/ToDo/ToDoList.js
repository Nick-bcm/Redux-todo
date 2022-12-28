import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ToDoItem from './ToDoItem'
import { fetchList, selectFilteredToDoIds } from './toDoSlice'

function ToDoList() {
  const dispatch = useDispatch()
  const ids = useSelector(selectFilteredToDoIds)

  useEffect(() => {
    dispatch(fetchList())
  }, [])

  return (
    <div className="row">
      <div className="col">
        {ids.map((id) => (
          <ToDoItem id={id} key={id} />
        ))}
      </div>
    </div>
  )
}

export default ToDoList
