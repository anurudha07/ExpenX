import React from 'react';

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="grid grid-cols-3 gap-2 justify-items-center w-full max-w-lg">
        {payload.map((entry, index) => (
          <div
            key={entry.value}
            className={`flex items-center text-sm ${
              index === 3 ? "col-span-3 mx-auto" : ""
            }`}
          >
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomLegend;