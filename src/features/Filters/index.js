import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { VISIBILITY_FILTERS, setFilter } from './filterSlice'

const Filters = () => {
  const dispatch = useDispatch()
  const filterKeys = Object.keys(VISIBILITY_FILTERS)
  const activeFilter = useSelector((state) => state.activeFilter)
  const changeFilter = ({target: {value}}) => dispatch(setFilter(value))

  return (
    <div className="btn-group  btn-group-sm" role="group">
      {filterKeys.map((key) => {
        const filter = VISIBILITY_FILTERS[key]

        return (
          <React.Fragment key={key}>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id={`filter_${filter}`}
              autoComplete="off"
              checked={activeFilter === filter}
              onChange={changeFilter}
              value={filter}
            />
            <label className="btn btn-outline-primary" htmlFor={`filter_${filter}`}>
              {filter}
            </label>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Filters
