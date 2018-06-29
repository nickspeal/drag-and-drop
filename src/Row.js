import React, { Component } from 'react';
import './Row.css';

class Row extends Component {
  render() {
    return (
      <div className="row" style={{...this.props.style}}>
        Placeholder
      </div>
    );
  }
}

export default Row;
