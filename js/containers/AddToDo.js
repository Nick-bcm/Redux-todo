import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addToDo } from '../actions'

class AddToDo extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, input){
    e.preventDefault();
    if (input.value.trim()) {
      this.props.dispatch(addToDo(input.value))
      input.value = ''
    }
  }

  render() {
    let input;
    return (
      <form className="form-inline" onSubmit={e => this.handleSubmit(e, input)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="ToDo"
            ref={node => {input = node}}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default">Добавить</button>
        </div>
      </form>
    );
  }
};

export default connect()(AddToDo)