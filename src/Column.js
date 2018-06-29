import React, { Component } from 'react';
import Row from './Row';
import './Column.css';

const rowHeight = 40;

class Column extends Component {
  state = {
    dragging: true,
    cursor: 0,
    rows: []
  }

  componentDidMount = () => {
    window.addEventListener('mousemove', this.onMouseMove);
    this.createRows();
  }

  onMouseMove = (event) => {
    this.setState({ cursor: event.y });
  }

  createRows = () => {
    const colors = ['red', 'blue', 'grey', 'yellow'];
    const rows = colors.map(backgroundColor => (
      <Row
        style = {{
          backgroundColor,
          height: `${rowHeight}px`
        }}
        key = {backgroundColor}
      />
    ));
    console.log(rows);
    this.setState({ rows });
  }

  computeFloatingPosition = () => {
    return Math.min(this.state.cursor, 4 * rowHeight);
  }

  renderRowsWithSpacer = () => {
    if (!this.state.dragging) {
      return this.state.rows;
    }
    // TODO explain comment
    const index = Math.floor((this.state.cursor + (rowHeight / 2)) / rowHeight);
    const spacer = <Row style={{ backgroundColor: 'white', height: `${rowHeight}px` }} key='spacer' />
    console.log(index);
    const nextRows = [...this.state.rows]
    nextRows.splice(index, 0, spacer);
    return nextRows;
  }

  render() {
    return (
      <div>
        <div className="column">
          {this.renderRowsWithSpacer()}
          <Row style={{ backgroundColor: 'pink', height: `${rowHeight}px`, position: 'absolute', top: this.computeFloatingPosition() }} />
        </div>
        Cursor: {this.state.cursor}
      </div>

    );
  }
}

export default Column;
