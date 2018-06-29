import React, { Component } from 'react';
import AddRowButton from './AddRowButton';
import Row from './Row';
import './Column.css';

const rowHeight = 40;

class Column extends Component {
  state = {
    cursor: 0,
    items: ['one', 'two', 'three', 'four'],
    draggedItem: undefined,
  }

  componentDidMount = () => {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (event) => {
    const clickedRowIndex = Math.floor(event.y / rowHeight);
    const nextItems = [...this.state.items];
    // Remove one item from clickedRowIndex and assign to draggedItem. Mutates nextItems
    const draggedItem = nextItems.splice(clickedRowIndex, 1);
    this.setState({ items: nextItems, draggedItem });
  }

  onMouseUp = (event) => {
    const nextItems = [...this.state.items];
    // Insert the draggedItem where the spacer was;
    nextItems.splice(this.computeSpacerIndex(), 0, this.state.draggedItem);
    this.setState({ items: nextItems, draggedItem: undefined });
  }

  onMouseMove = (event) => {
    this.setState({ cursor: event.y });
  }

  computeFloatingPosition = () => {
    return Math.min(this.state.cursor, this.state.items.length * rowHeight);
  }

  computeSpacerIndex = () => {
    return Math.floor((this.state.cursor + (rowHeight / 2)) / rowHeight);
  }

  // Maps an array of strings to an array of <Row> components with the string as a child
  renderRows = items => {
    return items.map(item => (
      <Row
        style = {{
          height: `${rowHeight}px`
        }}
        key = {item}
      >
        {item}
      </Row>
    ));
  }

  render() {
    let nextRows;
    let floatRow;

    if (this.state.draggedItem === undefined) {
      // Not Dragging
      nextRows = this.renderRows(this.state.items);
    } else {
      // Dragging
      nextRows = this.renderRows(this.state.items);
      const spacer = <Row style={{ backgroundColor: 'white', height: `${rowHeight}px` }} key='spacer' />;
      nextRows.splice(this.computeSpacerIndex(), 0, spacer);

      floatRow = (
        <Row
          style = {{
            height: `${rowHeight}px`,
            position: 'absolute',
            top: this.computeFloatingPosition(),
          }}
        >
          {this.state.draggedItem}
        </Row>
      )
    }

    return (
        <div className="column">
          <AddRowButton onClick={() => this.setState({ items: [...this.state.items, ''] })} />
          {nextRows}
          {floatRow}
        </div>
    );
  }
}

export default Column;
