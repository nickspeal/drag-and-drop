import React, { Component } from 'react';
import AddRowButton from './AddRowButton';
import Row from './Row';
import './Column.css';

const rowHeight = 40;

class Column extends Component {
  state = {
    cursor: 0,
    items: [
      {id: 1, value: 'one' },
      {id: 2, value: 'two' },
      {id: 3, value: 'three' },
    ],
    draggedItem: undefined,
  }

  componentDidMount = () => {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (clickedRowId) => {
    const nextItems = [...this.state.items];
    // Find the index of the item in state.items matching the ID for this click
    const clickedRowIndex = nextItems.findIndex(item => item.id === clickedRowId);
    // Remove one item from that index and assign it to draggedItem. Mutates nextItems
    const draggedItem = nextItems.splice(clickedRowIndex, 1)[0];
    this.setState({ items: nextItems, draggedItem });
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
    this.setState({ cursor: event.y });
  }

  onValueChange = (id, event) => {
    const index = this.state.items.findIndex(item => item.id === id);
    const nextItems = [...this.state.items];
    nextItems[index].value = event.target.value;
    this.setState({ items: nextItems });
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
        key = {item.id}
        value={item.value}
        onChange={(event) => this.onValueChange(item.id, event)}
        onMouseDown={() => this.onMouseDown(item.id)}
      />
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
          value={this.state.draggedItem.value}
        />
      )
    }

    return (
      <div>
        <AddRowButton onClick={() => this.setState({ items: [...this.state.items, ''] })} />
        <div className="column">
          {nextRows}
          {floatRow}
        </div>
      </div>
    );
  }
}

export default Column;
