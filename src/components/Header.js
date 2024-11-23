import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = () => {
    // 로그아웃 처리 로직 추가
    alert('로그아웃 되었습니다.');
    setIsModalOpen(false);
  };

  const location = useLocation();
  const hiddenPaths = ["/login", "/"];
  
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="header w-full bg-white shadow flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="/logo.svg" alt="App Logo" className="h-8" />
        </div>
        <div className="flex space-x-4">
          <NavLink to="/notice" className="text-black">
            <BellIcon className="h-6 w-6" />
          </NavLink>
          <button className="font-bold text-black" onClick={handleLogoutClick}>
            LogOut
          </button>
        </div>

        {/* 모달 컴포넌트 */}
        <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        title="Log out"
        message="로그아웃 하시겠습니까?"
        cancel="Cancel"
        confirm="Log out"
        />
    </div>
  );
};

export default Header;
