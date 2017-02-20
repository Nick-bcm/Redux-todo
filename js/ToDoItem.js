import React, { Component, PropTypes } from 'react'

export default class ToDoItem extends Component{
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }

  handleChange(item){
    this.props.onToggle(item)
  }

  handleRemove(item){
    this.props.onRemove(item)
  }

  render() {
    var item = this.props.item;
    return (
      <tr className={item.isDone && 'success'}>
        <td>
          <label className={item.isDone && 'done'}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={this.handleChange.bind(this, item)}
            />
            {item.name}
          </label>
        </td>
        <td className="tdicon"><div className="removeBtn" onClick={this.handleRemove.bind(this, item)}></div></td>
      </tr>
    );
  }
}

ToDoItem.propTypes = {
  item: PropTypes.shape({
    isDone: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  })
}