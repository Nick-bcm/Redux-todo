import { createSlice } from '@reduxjs/toolkit'

export const VISIBILITY_FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
}

const filtersSlice = createSlice({
  name: 'activeFilter',
  initialState: VISIBILITY_FILTERS.ALL,
  reducers: {
    setFilter: (state, { payload }) => payload,
  },
})

export const { setFilter } = filtersSlice.actions

export default filtersSlice.reducer

export const seletActiveFilter = (state) => state.activeFilter
