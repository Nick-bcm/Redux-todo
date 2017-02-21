import React, { Component } from 'react'
import ShowCount from '../containers/ShowCount'
import FilterLink from '../containers/FilterLink'

export default class Footer extends Component {
  render() {
    return (
      <div>
        <ShowCount />
        <p>
          Show:
          {" "}
          <FilterLink filter="SHOW_ALL">
            All
          </FilterLink>
          {", "}
          <FilterLink filter="SHOW_ACTIVE">
            Active
          </FilterLink>
          {", "}
          <FilterLink filter="SHOW_COMPLETED">
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}