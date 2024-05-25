import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      className="p-4 text-xl bg-gray-200 hover:bg-gray-300 rounded"
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Button;
