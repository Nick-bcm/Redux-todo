import React, { Component, PropTypes } from 'react'

import ToDoItem from './ToDoItem'

export default class ToDoList extends Component{
  render() {

    return(
      <table className="table table-hover table-sm table-responsive">
        <tbody>
          {this.props.toDoList.map(toDoItem =>
            <ToDoItem
              // item={item}
              key={toDoItem.id}
              {...toDoItem}
              onToggle={() => this.props.onToggle(toDoItem.id)}
              onRemove={() => this.props.onRemove(toDoItem.id)}
            />
          )}
        </tbody>
      </table>
    );
  }
};

ToDoList.propTypes = {
  toDoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}