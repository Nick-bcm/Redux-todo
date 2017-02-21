import React, { Component } from 'react'

import AddToDo from '../containers/AddToDo'
import VisibleToDoList from '../containers/VisibleToDoList'
import Footer from './Footer'

export default class App extends Component{
  render() {
    // var notDoneToDoCount = this.state.list.reduce(function (accum, todo) {
    //     return todo.isDone ? accum : accum + 1;
    //   }, 0);
        // <p>Осталось выполнить: {notDoneToDoCount}</p>

    return(
      <div>
        <AddToDo />
        <VisibleToDoList />
        <Footer />
      </div>
    );
  }
}