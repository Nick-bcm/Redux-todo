import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import toDoListReducer from './features/ToDo/toDoSlice'
import filtersReducer from './features/Filters/filterSlice'

const store = configureStore({
  reducer: {
    toDoList: toDoListReducer,
    activeFilter: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
