import React, { Component } from 'react';

class AddRowButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={this.props.className}>
        Add A New Row
      </button>
    );
  }
}

export default AddRowButton;
