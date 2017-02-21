import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class ShowCount extends Component {
  render() {
    return(
      <div>
        {this.props.notDoneToDoCount > 0 &&
          <p>Осталось выполнить: {this.props.notDoneToDoCount}</p>
        }
        {this.props.notDoneToDoCount == 0 &&
          <p>Всё выполнено</p>
        }
      </div>
    )
  }
}

ShowCount.propTypes = {
  notDoneToDoCount: PropTypes.number.isRequired
}

const getCount = (toDoList) => {
  return toDoList.reduce((accum, todo) => {
    return todo.isDone ? accum : accum + 1;
  }, 0);
}

const mapStateToProps = (state) => {
  return {
    notDoneToDoCount: getCount(state.toDoList)
  }
}

export default connect(mapStateToProps)(ShowCount)