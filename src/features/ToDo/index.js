import ToDoList from './ToDoList'
import AddToDoForm from './AddToDoForm'
import Filters from '../Filters'

function ToDo() {
  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <AddToDoForm />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <Filters />
        </div>
      </div>

      <div className="row w-100">
        <div className="col-8 col-md-6 m-auto">
          <ToDoList />
        </div>
      </div>
    </>
  )
}

export default ToDo
