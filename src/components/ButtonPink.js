import React from "react";

const ButtonPink = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <button
      className={`px-6 py-2 w-full bg-pink2 text-white text-sm rounded-lg whitespace-nowrap ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPink;
