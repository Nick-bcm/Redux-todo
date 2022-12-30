import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ToDoItem from './ToDoItem'
import { fetchList, selectFilteredToDoIds, selectIsLoading } from './toDoSlice'

function ToDoList() {
  const dispatch = useDispatch()
  const ids = useSelector(selectFilteredToDoIds)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    const promise = dispatch(fetchList())

    return () => {
      promise.abort()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="row">
        <div className="col text-center">
          <i className="spinner-border text-white" />
        </div>
      </div>
    )
  }

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
