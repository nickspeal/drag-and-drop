import React, { Component } from 'react';
import './Row.css';

class Row extends Component {
  render() {
    return (
      <div className="row" style={{...this.props.style}}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;
