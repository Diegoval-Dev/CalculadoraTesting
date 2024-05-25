import React from 'react';

const Display = ({ value }) => {
  return (
    <div className="border border-slate-700 p-4 mb-4 text-2xl text-right h-16 overflow-hidden text-white">
      {value}
    </div>
  );
};

export default Display;