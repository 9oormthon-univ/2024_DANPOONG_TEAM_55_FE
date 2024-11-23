import React from 'react';

function RoleSelectionModal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null; // 모달이 닫혀 있으면 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 text-center rounded-lg shadow-lg w-11/12 max-w-md">
        <h3 className="text-base font-bold text-black mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default RoleSelectionModal;
