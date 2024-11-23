import React from 'react';

const PraiseButton = ({ label, onClick, isSelected, isNegative }) => {
  const buttonClassName = `px-3 py-1 rounded-full text-xxs ${
    isSelected
      ? (isNegative ? 'bg-blue-200 text-white' : 'bg-pink2 text-white')
      : 'bg-gray2 text-black'
  }`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {label}
    </button>
  );
};

export default PraiseButton;
