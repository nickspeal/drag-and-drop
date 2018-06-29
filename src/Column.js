import React, { Component } from 'react';
import AddRowButton from './AddRowButton';
import Row from './Row';
import { ROW_HEIGHT } from './Row';
import './Column.css';

const COLUMN_ID = 'column';

class Column extends Component {
  state = {
    cursor: 0,
    cursorOffset: 0,
    items: [
      {id: 0, value: 'y = mx + b' },
      {id: 1, value: 'y = ax^2 + bx + c' },
      {id: 2, value: '' },
    ],
    draggedItem: undefined,
  }

  nextRowId = 3;

  componentDidMount = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (clickedRowId, event) => {
    // click height within the row:
    const cursorOffset = event.clientY - event.target.getBoundingClientRect().top;
    const nextItems = [...this.state.items];
    // Find the index of the item in state.items matching the ID for this click
    const clickedRowIndex = nextItems.findIndex(item => item.id === clickedRowId);
    // Remove one item from that index and assign it to draggedItem. Mutates nextItems
    const draggedItem = nextItems.splice(clickedRowIndex, 1)[0];
    event.persist();
    this.setState({ items: nextItems, cursorOffset, draggedItem }, () => this.onMouseMove(event));
  }

  onMouseUp = () => {
    const nextItems = [...this.state.items];
    // Insert the draggedItem where the spacer was;
    if(this.state.draggedItem) {
      nextItems.splice(this.computeSpacerIndex(), 0, this.state.draggedItem);
    } else {
      console.error("Mouseup cannot replace draggeditem: ", this.state.draggedItem);
    }
    this.setState({ items: nextItems, draggedItem: undefined });
  }

  onMouseMove = (event) => {
    if (this.state.draggedItem !== undefined) {
      const columnTopOffset = document.getElementById(COLUMN_ID).getBoundingClientRect().top;
      // Position of cursor relative to the top of the column
      const cursor = event.clientY - columnTopOffset - this.state.cursorOffset;
      this.setState({ cursor });
    }
  }

  onKeyDown = (id, event) => {
    if (event.key === 'ArrowDown') {
      this.incrementPosition(id, 1);
    } else if (event.key === 'ArrowUp') {
      this.incrementPosition(id, -1);
    } else if (event.key === 'Enter') {
      this.addNewRow();
    } else if (event.key === 'Backspace') {
      this.deleteRow(id);
    }
  }

  incrementPosition = (id, delta) => {
    console.log("about to move item ", id, delta)
    const index = this.state.items.findIndex(item => item.id === id);
    const nextIndex = Math.max(0, Math.min(index + delta, this.state.items.length));
    const item = this.state.items[index];
    const nextItems = [...this.state.items];
    nextItems.splice(index, 1);
    nextItems.splice(nextIndex, 0, item);
    this.setState({ items: nextItems });
  }

  onValueChange = (id, event) => {
    const index = this.state.items.findIndex(item => item.id === id);
    const nextItems = [...this.state.items];
    nextItems[index].value = event.target.value;
    this.setState({ items: nextItems });
  }

  addNewRow = () => {
    const row = {
      id: this.nextRowId,
      value: '',
    }
    this.nextRowId += 1;

    this.setState({ items: [...this.state.items, row] });
  }

  deleteRow = (id) => {
    const index = this.state.items.findIndex(item => item.id === id);
    // Only delete empty rows
    if (this.state.items[index].value.length === 0) {
      const nextItems = [...this.state.items];
      nextItems.splice(index, 1);
      this.setState({ items: nextItems });
    }
  }

  computeFloatingPosition = () => {
    return Math.max(0, Math.min(this.state.cursor, this.state.items.length * ROW_HEIGHT));
  }

  computeSpacerIndex = () => {
    return Math.max(0, Math.floor((this.state.cursor + (ROW_HEIGHT / 2)) / ROW_HEIGHT));
  }

  // Maps an array of strings to an array of <Row> components with the string as a child
  renderRows = items => {
    return items.map((item, index) => (
      <Row
        key = {item.id}
        value={item.value}
        onChange={(event) => this.onValueChange(item.id, event)}
        onMouseDown={(event) => this.onMouseDown(item.id, event)}
        onKeyDown={(event) => this.onKeyDown(item.id, event)}
        number={index}
      />
    ));
  }

  render() {
    let staticRows;
    let floatRow;

    if (this.state.draggedItem === undefined) {
      // Not Dragging
      staticRows = this.renderRows(this.state.items);
    } else {
      // Dragging
      staticRows = this.renderRows(this.state.items);
      const spacer = <Row key='spacer' spacer />;
      staticRows.splice(this.computeSpacerIndex(), 0, spacer);
      floatRow = (
        <Row
          style = {{
            position: 'absolute',
            top: this.computeFloatingPosition(),
          }}
          value={this.state.draggedItem.value}
        />
      )
    }

    return (
      <div>
        <AddRowButton onClick={this.addNewRow} className="addbutton" />
        <div className="column" id={COLUMN_ID}>
          {staticRows}
          {floatRow}
        </div>
      </div>
    );
  }
}

export default Column;
