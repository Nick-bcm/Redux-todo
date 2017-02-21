import React, { Component, PropTypes } from 'react'

export default class ToDoItem extends Component{

  render() {
    const { text, isDone, onToggle, onRemove } = this.props
    return (
      <tr className={isDone && 'success'}>
        <td>
          <label className={isDone && 'done'}>
            <input
              type="checkbox"
              checked={isDone}
              onChange={onToggle}
            />
            {text}
          </label>
        </td>
        <td className="tdicon">
          <div
            className="removeBtn"
            onClick={onRemove}>
          </div>
        </td>
      </tr>
    );
  }
}

ToDoItem.propTypes = {
  isDone: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}