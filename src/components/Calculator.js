import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [accumulator, setAccumulator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleButtonClick = (label) => {
    if (!isNaN(Number(label)) || label === '.') {
      if (waitingForOperand) {
        setDisplayValue(label);
        setWaitingForOperand(false);
      } else {
        if (displayValue.length < 9) {
          setDisplayValue(displayValue + label);
        }
      }
    } else if (label === 'C') {
      setDisplayValue('');
      setPendingOperation(null);
      setAccumulator(null);
      setWaitingForOperand(false);
    } else if (['+', '-', '*', '/'].includes(label)) {
      if (pendingOperation && accumulator !== null && !waitingForOperand) {
        const result = evaluate(pendingOperation, accumulator, parseFloat(displayValue));
        if (result > 999999999 || result < 0) {
          setDisplayValue('ERROR');
          setAccumulator(null);
        } else {
          setDisplayValue(result.toString());
          setAccumulator(result);
        }
      } else {
        setAccumulator(parseFloat(displayValue));
      }
      setPendingOperation(label);
      setWaitingForOperand(true);
    } else if (label === '=') {
      if (pendingOperation && accumulator !== null) {
        const result = evaluate(pendingOperation, accumulator, parseFloat(displayValue));
        if (result > 999999999 || result < 0) {
          setDisplayValue('ERROR');
          setAccumulator(null);
        } else {
          setDisplayValue(result.toString());
        }
        setPendingOperation(null);
        setAccumulator(null);
        setWaitingForOperand(false);
      }
    }
  };

  const evaluate = (operation, a, b) => {
    let result;
    switch (operation) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      default:
        result = b;
        break;
    }
    return result;
  };

  return (
    <div className="border border-slate-700 p-8 rounded bg-slate-950">
      <Display value={displayValue || '0'} />
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/'].map((label) => (
          <Button key={label} label={label} onClick={handleButtonClick} />
        ))}
        <Button label="C" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Calculator;
