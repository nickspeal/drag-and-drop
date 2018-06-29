import React, { Component } from 'react';
import './Row.css';

export const ROW_HEIGHT = 40;

class Row extends Component {
  render() {
    return (
      <div
        className="row"
        style={{ ...this.props.style, height:`${ROW_HEIGHT}px`}}
        onMouseDown={this.props.onMouseDown}
        onKeyDown={this.props.onKeyDown}
      >
        {this.props.number !== undefined && <span className="label">Eq {this.props.number}</span>}
        {!this.props.spacer && (
          <input
            className="input"
            value={this.props.value}
            onMouseDown={e => e.stopPropagation()}
            onChange={this.props.onChange}
            readOnly={this.props.readOnly}
            autoFocus />
        )
      }
      </div>
    );
  }
}

export default Row;
