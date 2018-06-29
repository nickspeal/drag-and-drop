import React, { Component } from 'react';

class Calculator extends Component {

  calculator = null;

  componentDidMount = () => {
    const elt = document.getElementById('calculator');
    const options = {
      expressions: false,
    }
    this.calculator = window.Desmos.GraphingCalculator(elt, options);
    this.setExpressions(this.props.items);
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.items !== prevProps.items) {
      this.setExpressions(this.props.items)
    }
  }

  setExpressions = (items) => {
    if (items) {
      items.forEach(item => {
        item && this.calculator.setExpression({id: item.id, latex:item.value});
      });
    }
  }

  render() {
    return (
      <div id="calculator" style={{ width: '600px', height: '400px' }}>
      </div>
    )
  }
}

export default Calculator;
