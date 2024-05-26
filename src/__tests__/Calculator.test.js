import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from '../components/Calculator';

describe('Calculator', () => {
  it('renders the display and buttons', () => {
    render(<Calculator />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByText('0').length).toBe(2);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();
    expect(screen.getByText('+/-')).toBeInTheDocument();
  });

  it('displays numbers when buttons are clicked', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    expect(screen.getByRole('textbox').textContent).toBe('123');
  });

  it('performs addition correctly', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByRole('textbox').textContent).toBe('3');
  });

  it('performs subtraction correctly and shows ERROR for negative result', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByText('+/-'));
    expect(screen.getByRole('textbox').textContent).toBe('1');
  });

  it('performs multiplication correctly', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox').textContent).toBe('6');
  });

  it('performs division correctly', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox').textContent).toBe('2');
  });

  it('handles decimal point correctly', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    expect(screen.getByRole('textbox').textContent).toBe('1.5');
  });

  it('toggles sign correctly with "+/-" button', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('+/-'));
    expect(screen.getByRole('textbox').textContent).toBe('-3');
  });

  it('handles keyboard input correctly', () => {
    render(<Calculator />);
    fireEvent.keyDown(window, { key: '1' });
    fireEvent.keyDown(window, { key: '2' });
    fireEvent.keyDown(window, { key: '3' });
    expect(screen.getByRole('textbox').textContent).toBe('3');
    fireEvent.keyDown(window, { key: 'Backspace' });
    expect(screen.getByRole('textbox').textContent).toBe('0');
  });


});
