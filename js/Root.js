import React, { Component, PropTypes } from 'react'

import Filter from './Filter'
import AddToDo from './AddToDo'
import ListToDo from './ListToDo'

export default class Root extends Component{
  constructor(props){
    super(props);
    this.state = {
      list: this.props.list,
      isNotDoneOnly: false
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.toggle = this.toggle.bind(this);
    this.remove = this.remove.bind(this);
  }

  handleFilter(isNotDoneOnly){
    this.setState({
      isNotDoneOnly: isNotDoneOnly
    });
  }

  handleNewItem(newItemText) {
    var newList = this.state.list;
    newList.push({ name: newItemText, isDone: false });
    this.setState({
      list: newList

    });
  }

  toggle(itemToToggle) {
    var newList = this.state.list.map((item) => {
      if (item === itemToToggle)
        item.isDone = !item.isDone;
      return item;
    });
    this.setState({
      list: newList
    });
  }

  remove(itemToRemove){
    var newList = this.state.list.filter((item) => {
      return item !== itemToRemove;
    });
    this.setState({
      list: newList
    });
  }

  render() {
    var notDoneToDoCount = this.state.list.reduce(function (accum, todo) {
        return todo.isDone ? accum : accum + 1;
      }, 0);

    return(
      <div>
        <Filter isNotDoneOnly={this.state.isNotDoneOnly} handleFilter={this.handleFilter}/>
        <AddToDo handleNewItem={this.handleNewItem}/>
        <ListToDo
          list={this.state.list}
          isNotDoneOnly={this.state.isNotDoneOnly}
          onToggle={this.toggle}
          onRemove={this.remove}
        />
        <p>Осталось выполнить: {notDoneToDoCount}</p>
      </div>
    );
  }
}

Root.propTypes = {
  list: PropTypes.array.isRequired
}