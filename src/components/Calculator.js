import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [accumulator, setAccumulator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      setActiveKey(key);
      setTimeout(() => setActiveKey(null), 100); 
      if (!isNaN(Number(key)) || key === '.') {
        handleButtonClick(key);
      } else if (key === 'Enter' || key === '=') {
        handleButtonClick('=');
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Backspace') {
        handleButtonClick('Backspace');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', () => setActiveKey(null));
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', () => setActiveKey(null));
    };
  }, []);

  const handleButtonClick = (label) => {
    if (displayValue === 'ERROR' && label !== 'C') {
      return;
    }

    if (!isNaN(Number(label)) || label === '.') {
      if (waitingForOperand) {
        setDisplayValue(label);
        setWaitingForOperand(false);
      } else {
        if (displayValue.length < 9) {
          setDisplayValue(displayValue === '0' && label !== '.' ? label : displayValue + label);
        }
      }
    } else if (label === 'Backspace') {
      if (displayValue.length > 1) {
        setDisplayValue(displayValue.slice(0, -1));
      } else {
        setDisplayValue('0');
      }
    } else if (label === 'C') {
      setDisplayValue('0');
      setPendingOperation(null);
      setAccumulator(null);
      setWaitingForOperand(false);
    } else if (['+', '-', '*', '/'].includes(label)) {
      if (pendingOperation && accumulator !== null && !waitingForOperand) {
        const result = evaluate(pendingOperation, accumulator, parseFloat(displayValue));
        if (result > 999999999 || result < -999999999) {
          setDisplayValue('ERROR');
          setAccumulator(null);
        } else {
          setDisplayValue(result);
          setAccumulator(result);
        }
      } else {
        setAccumulator(parseFloat(displayValue));
      }
      setPendingOperation(label);
      setWaitingForOperand(true);
    } else if (label === '=') {
      if (pendingOperation && accumulator !== null && !waitingForOperand) {
        const result = evaluate(pendingOperation, accumulator, parseFloat(displayValue));
        if (result > 999999999 || result < -999999999) {
          setDisplayValue('ERROR');
          setAccumulator(null);
        } else {
          setDisplayValue(result);
        }
        setPendingOperation(null);
        setAccumulator(null);
        setWaitingForOperand(false);
      } else {
        setDisplayValue('ERROR');
      }
    } else if (label === '+/-') {
      if (displayValue !== '0' && displayValue !== 'ERROR') {
        const newValue = parseFloat(displayValue) * -1;
        if (newValue > 999999999 || newValue < -999999999) {
          setDisplayValue('ERROR');
        } else {
          setDisplayValue(newValue.toString());
        }
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

    const resultString = result.toString();
    if (resultString.length > 9) {
      if (resultString.includes('.')) {
        const [integerPart, decimalPart] = resultString.split('.');
        const roundedResult = integerPart + '.' + decimalPart.slice(0, 9 - integerPart.length - 1);
        return parseFloat(roundedResult).toString();
      } else {
        return 'ERROR';
      }
    }

    return result.toString();
  };

  return (
    <div className="border border-slate-700 p-8 rounded bg-slate-900">
      <Display value={displayValue} />
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/', 'C', '+/-'].map((label) => (
          <Button
            key={label}
            label={label}
            onClick={() => handleButtonClick(label)}
            isActive={activeKey === label || activeKey === (label === '=' ? 'Enter' : label)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
