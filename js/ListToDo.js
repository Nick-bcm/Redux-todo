import React, { Component, PropTypes } from 'react'

import ToDoItem from './ToDoItem'

export default class ListToDo extends Component{
  render() {

    var list= [];
    this.props.list.forEach((item, index) => {
      if (!this.props.isNotDoneOnly || !item.isDone) {
        list.push(
          <ToDoItem
            item={item}
            key={index}
            onToggle={this.props.onToggle}
            onRemove={this.props.onRemove}
          />
        )
      }
    });

    return(
      <table className="table table-hover table-sm table-responsive">
        <tbody>
          {list}
        </tbody>
      </table>
    );
  }
};

ListToDo.propTypes = {
  list: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}