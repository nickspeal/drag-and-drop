import React, { Component } from 'react';
import Row from './Row';
import './Column.css';

class Column extends Component {
  render() {
    return (
      <div className="column">
        <Row style={{ backgroundColor: 'red' }} />
        <Row style={{ backgroundColor: 'blue' }} />
        <Row style={{ backgroundColor: 'grey' }} />
        <Row style={{ backgroundColor: 'yellow' }} />
      </div>
    );
  }
}

export default Column;
