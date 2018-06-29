import React, { Component } from 'react';
import './Row.css';

class Row extends Component {
  render() {
    return (
      <div className="row" style={this.props.style} onMouseDown={this.props.onMouseDown} >
        <input value={this.props.value} onMouseDown={e => e.stopPropagation()} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default Row;
