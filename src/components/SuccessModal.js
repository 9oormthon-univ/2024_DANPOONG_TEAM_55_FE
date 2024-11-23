import React from 'react';
import ButtonWhite from './ButtonWhite';

function SuccessModal({ isOpen, onClose, title, message }) {
  console.log('SuccessModal Props:', { isOpen, title, message });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 text-center rounded-lg shadow-lg w-11/12 max-w-md">
        <h3 className="text-base font-bold text-black mb-2">{title}</h3>
        <p className="text-xs text-gray-500 mb-4">{message}</p>
        <div className="mt-4">
          <ButtonWhite onClick={onClose}>
            닫기
          </ButtonWhite>
        </div>
      </div>
    </div>
  );
}


export default SuccessModal;
