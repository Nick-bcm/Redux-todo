import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ToDoItem from './ToDoItem'
import { fetchList, selectToDoIds, selectFilteredToDoIds } from './toDoSlice'

const ToDoList = () => {
  const dispatch = useDispatch()
  // const ids = useSelector(selectToDoIds)
  const ids = useSelector(selectFilteredToDoIds)

  useEffect(() => {
    dispatch(fetchList())
  }, [])

  return (
    <>
      <div className="row">
        <div className="col">
          {ids.map((id) => (
            <ToDoItem id={id} key={id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ToDoList
