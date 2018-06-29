import React, { Component } from 'react';

class AddRowButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        Add New Row
      </button>
    );
  }
}

export default AddRowButton;
