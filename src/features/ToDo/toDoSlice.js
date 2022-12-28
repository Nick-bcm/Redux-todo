import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import _ from 'lodash'

import { VISIBILITY_FILTERS, seletActiveFilter } from '../Filters/filterSlice'

const data = [
  { id: 1, title: '123', isDone: false },
  { id: 2, title: 'qwe', isDone: true },
  { id: 3, title: 'asd', isDone: false },
]

const api = {
  getList: () => new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 1000)
  }),
  patchItem: (item) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(item), 1000)
  }),
  deleteItem: (id) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000)
  }),
  createItem: (title) => new Promise((resolve, reject) => {
    setTimeout(
      () => resolve({ title, isDone: false, id: Math.ceil(Math.random() * 1000) }),
      1000,
    )
  }),
}

export const fetchList = createAsyncThunk('toDoList/fetchList', async () => {
  const response = await api.getList()
  return response
})

export const createToDo = createAsyncThunk('toDoList/createToDo', async (title) => {
  const response = await api.createItem(title)
  return response
})

const initialState = {
  entities: {},
  isLoading: false,
}

const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    addToDo: (state, { payload }) => {
      state.entities[payload.id] = payload
    },
    toggleToDo: (state, { payload }) => {
      const toDoItem = state.entities[payload]
      toDoItem.isDone = !toDoItem.isDone
    },
    deleteToDo: (state, { payload }) => {
      delete state.entities[payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchList.fulfilled, (state, { payload }) => {
        state.entities = payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})
        state.isLoading = false
      })
      .addCase(createToDo.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = payload
      })
  },
})

export const { addToDo, toggleToDo, deleteToDo } = toDoListSlice.actions

export default toDoListSlice.reducer

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
