import React from 'react';

const Button = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`p-4 text-xl bg-gray-200 hover:bg-gray-300 rounded-xl ${isActive ? 'bg-yellow-400' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
