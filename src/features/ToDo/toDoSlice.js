import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'

import { VISIBILITY_FILTERS, seletActiveFilter } from '../Filters/filterSlice'
import { API_HOST } from '../../settings'

const TODO_API_HOST = `${API_HOST}/todos`

const api = {
  getList: () => axios.get(TODO_API_HOST).then(({ data }) => data),
  patchItem: ({ id, isDone }) => (
    axios.patch(`${TODO_API_HOST}/${id}`, { isDone }).then(({ data }) => data)
  ),
  deleteItem: (id) => axios.delete(`${TODO_API_HOST}/${id}`).then(({ data }) => data),
  createItem: (title) => axios.post(TODO_API_HOST, { title }).then(({ data }) => data),
}

export const fetchList = createAsyncThunk(
  'toDoList/fetchList',
  async () => {
    const response = await api.getList()
    return response
  },
  {
    condition: (arg, { getState }) => {
      const {
        toDoList: { isLoading },
      } = getState()

      return !isLoading
    },
  },
)

export const deleteToDo = createAsyncThunk('toDoList/deleteToDo', async (id) => {
  const response = await api.deleteItem(id)
  return response && id
})

export const createToDo = createAsyncThunk('toDoList/createToDo', async (title) => {
  const response = await api.createItem(title)
  return response
})

export const updateToDo = createAsyncThunk('toDoList/updateToDo', async (item) => {
  const response = await api.patchItem(item)
  return response
})

const initialState = {
  entities: {},
  isLoading: false,
  isCreating: false,
}

const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  // reducers: {
  //   addToDo: (state, { payload }) => {
  //     state.entities[payload.id] = payload
  //   },
  //   toggleToDo: (state, { payload }) => {
  //     const toDoItem = state.entities[payload]
  //     toDoItem.isDone = !toDoItem.isDone
  //   },
  //   deleteToDo: (state, { payload }) => {
  //     delete state.entities[payload]
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchList.fulfilled, (state, { payload }) => {
        state.entities = payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})
        state.isLoading = false
      })
      .addCase(fetchList.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(deleteToDo.pending, (state, action) => {
        // don't know what the arg is
        const id = action.meta.arg
        const itemToDelete = state.entities[id]

        itemToDelete.isDeleting = true
      })
      .addCase(deleteToDo.fulfilled, (state, { payload }) => {
        if (payload) {
          delete state.entities[payload]
        }
      })

      .addCase(updateToDo.pending, (state, action) => {
        // don't know what the arg is
        const { id } = action.meta.arg
        const itemToUpd = state.entities[id]

        itemToUpd.isSaving = true
      })
      .addCase(updateToDo.fulfilled, (state, { payload }) => {
        const itemToUpd = state.entities[payload.id]

        itemToUpd.isSaving = false
        itemToUpd.isDone = payload.isDone
      })
      .addCase(updateToDo.rejected, (state, action) => {
        const { id } = action.meta.arg
        const itemToUpd = state.entities[id]

        itemToUpd.isSaving = false
      })

      .addCase(createToDo.pending, (state) => {
        state.isCreating = true
      })
      .addCase(createToDo.fulfilled, (state, { payload }) => {
        state.isCreating = false
        state.entities[payload.id] = payload
      })
      .addCase(createToDo.rejected, (state) => {
        state.isCreating = false
      })
  },
})

export default toDoListSlice.reducer

export const selectIsCreating = (state) => state.toDoList.isCreating
export const selectIsLoading = (state) => state.toDoList.isLoading
export const selectToDoEntities = (state) => state.toDoList.entities
export const selectToDoById = (state, id) => state.toDoList.entities[id]

export const selectFilteredToDoEntities = createSelector(
  selectToDoEntities,
  seletActiveFilter,
  (entities, activeFilter) => {
    if (activeFilter === VISIBILITY_FILTERS.ALL) {
      return entities
    }

    if (activeFilter === VISIBILITY_FILTERS.COMPLETED) {
      return _.pickBy(entities, ({ isDone }) => isDone)
    }
    return _.pickBy(entities, ({ isDone }) => !isDone)
  },
)

export const selectFilteredToDoIds = createSelector(
  selectFilteredToDoEntities,
  (entities) => _.keys(entities),
)
