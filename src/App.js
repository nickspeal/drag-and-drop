import React, { Component } from 'react';
import Column from './Column';
import Calculator from './Calculator';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h2>Enter your equations below</h2>
          <h3>Click and Drag the boxes or use the arrow keys to re-order</h3>
          <Column />
        </div>
        <Calculator />
      </div>
    );
  }
}

export default App;
