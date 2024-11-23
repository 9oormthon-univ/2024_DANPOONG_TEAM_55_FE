import React from 'react';
import ButtonWhite from './ButtonWhite';
import ButtonPink from './ButtonPink';

function Modal({ isOpen, onClose, onConfirm, title, message, cancel, confirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 text-center rounded-lg shadow-lg">
        <h3 className="text-base font-bold text-black mb-2">{title}</h3>
        <p className="text-xs text-gray-500 mb-4">{message}</p>
        <div className="mt-4 flex justify-between gap-4">
          <ButtonWhite onClick={onClose}>
            {cancel}
          </ButtonWhite>
          <ButtonPink onClick={onConfirm}>
            {confirm}
          </ButtonPink>
        </div>
      </div>
    </div>
  );
}

export default Modal;
