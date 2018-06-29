import React, { Component } from 'react';
import './Row.css';

export const ROW_HEIGHT = 100;

class Row extends Component {
  render() {
    return (
      <div
        className="row"
        style={{ ...this.props.style, height:`${ROW_HEIGHT}px`}}
        onMouseDown={this.props.onMouseDown}
        onKeyDown={this.props.onKeyDown}
      >
        {!this.props.spacer && (
          <input value={this.props.value} onMouseDown={e => e.stopPropagation()} onChange={this.props.onChange} autoFocus />
        )
      }
      </div>
    );
  }
}

export default Row;
