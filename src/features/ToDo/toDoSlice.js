import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import _ from 'lodash'

import { VISIBILITY_FILTERS } from '../Filters/filterSlice'

const data = [
  { id: 1, title: '123', isDone: false },
  { id: 2, title: 'qwe', isDone: true },
  { id: 3, title: 'asd', isDone: false },
]

const api = {
  getList: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 1000)
    }),
  patchItem: (item) =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(item), 1000)
    }),
  deleteItem: (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 1000)
    }),
  createItem: (title) =>
    new Promise((resolve, reject) => {
      setTimeout(
        () => resolve({ title, isDone: false, id: Math.ceil(Math.random() * 1000) }),
        1000
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
  ids: [],
  isLoading: false,
}

const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    addToDo: ({ ids, entities }, { payload }) => {
      entities[payload.id] = payload
      ids.push(payload.id)
    },
    toggleToDo: ({ entities }, { payload }) => {
      const toDoItem = entities[payload]
      toDoItem.isDone = !toDoItem.isDone
    },
    deleteToDo: (state, { payload }) => {
      state.ids = state.ids.filter((id) => id !== payload)
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
        state.ids = payload.map(({ id }) => id)
        state.isLoading = false
      })
      .addCase(createToDo.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = payload
        state.ids.unshift(payload.id)
      })
  },
})

export const { addToDo, toggleToDo, deleteToDo } = toDoListSlice.actions

export default toDoListSlice.reducer

export const selectToDoEntities = (state) => state.toDoList.entities
export const selectToDoIds = (state) => state.toDoList.ids
export const selectToDoById = (state, id) => state.toDoList.entities[id]

export const selectFilteredToDoEntities = createSelector(
  selectToDoEntities,
  (state) => state.activeFilter,
  (entities, activeFilter) => {
    if (activeFilter === VISIBILITY_FILTERS.ALL) {
      return entities
    }

    if (activeFilter === VISIBILITY_FILTERS.COMPLETED) {
      return _.pickBy(entities, ({ isDone }) => isDone)
    } else {
      return _.pickBy(entities, ({ isDone }) => !isDone)
    }
  }
)

export const selectFilteredToDoIds = createSelector(
  selectFilteredToDoEntities,
  (entities) => _.keys(entities)
)
