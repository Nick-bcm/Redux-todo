import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createToDo } from './toDoSlice'

const AddToDoForm = () => {
  const [ newTitle, changeTitle ] = useState('')
  const dispatch = useDispatch()
  const handleCreate = (title) => dispatch(createToDo(title))

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        // const input = e.currentTarget.querySelector('input')
        // handleCreate(newTitle)
        await dispatch(createToDo(newTitle))
        changeTitle('')
      }}
    >
      <div className="input-group">
        <input
          value={newTitle}
          type="text"
          className="form-control"
          name="title"
          onChange={(e) => changeTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          <i className="bi bi-plus-lg" />
        </button>
      </div>
    </form>
  )
}

export default AddToDoForm
