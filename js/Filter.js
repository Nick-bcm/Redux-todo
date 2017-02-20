import React, { Component, PropTypes } from 'react'

export default class Filter extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    this.props.handleFilter(this.isNotDoneOnlyInput.checked);
  }

  render() {
    return (
      <div className="filter" >
        <label >
          <input
            type="checkbox"
            checked={this.props.isNotDoneOnly}
            ref={(input) => this.isNotDoneOnlyInput = input}
            onChange={this.handleChange}
          />
          Показать оставшиеся
        </label>
      </div>
    );
  }
};

Filter.propTypes = {
  isNotDoneOnly: PropTypes.bool.isRequired,
  handleFilter: PropTypes.func.isRequired
}