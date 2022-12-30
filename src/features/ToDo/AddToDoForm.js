import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createToDo, selectIsCreating } from './toDoSlice'

function AddToDoForm() {
  const [newTitle, changeTitle] = useState('')
  const isCreating = useSelector(selectIsCreating)
  const dispatch = useDispatch()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await dispatch(createToDo(newTitle))
        changeTitle('')
      }}
    >
      <div className="input-group">
        <input
          className="form-control"
          disabled={isCreating}
          name="title"
          onChange={(e) => changeTitle(e.target.value)}
          type="text"
          value={newTitle}
        />
        <button type="submit" className="btn btn-success" disabled={isCreating}>
          {isCreating ? (
            <i className="spinner-border spinner-border-sm text-white" />
          ) : (
            <i className="bi bi-plus-lg" />
          )}
        </button>
      </div>
    </form>
  )
}

export default AddToDoForm
