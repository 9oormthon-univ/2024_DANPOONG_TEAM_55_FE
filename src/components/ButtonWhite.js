import React from "react";

const ButtonWhite = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`px-6 py-2 w-full border-2 border-pink2 text-pink2 text-sm rounded-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonWhite;
