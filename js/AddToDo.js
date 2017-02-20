import React, { Component, PropTypes } from 'react'

export default class AddToDo extends Component{
  constructor(props){
    super(props);
    this.state = {
      newItemText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    var val = this.state.newItemText.trim();
    if (val) {
      this.props.handleNewItem(val);
      this.setState({
        newItemText: ''
      });
    }
  }

  handleInputChange(e){
    this.setState({
      newItemText: e.target.value
    });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleChange}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={this.state.newItemText}
            onChange={this.handleInputChange}
            placeholder="ToDo"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default">Добавить</button>
        </div>
      </form>
    );
  }
};

AddToDo.propTypes = {
  handleNewItem: PropTypes.func.isRequired
}