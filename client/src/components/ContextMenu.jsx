import React from "react";

const ContextMenu = ({ x, y, options, onClose }) => {
  return (
    <div
      className="absolute bg-gray-800 text-white shadow-lg rounded z-50"
      style={{ top: y, left: x }}
      onMouseLeave={onClose}
    >
      {options.map((opt, i) => (
        <div
          key={i}
          onClick={() => {
            opt.onClick();
            onClose();
          }}
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;