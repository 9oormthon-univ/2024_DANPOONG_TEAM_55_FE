import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, HandThumbUpIcon, CloudIcon, UserIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const location = useLocation();
  const hiddenPaths = ["/login", "/", "/roleselection"];
  const isActive = location.pathname === '/evaluation' || location.pathname.startsWith('/evaluate/');
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setSelectedRole(role);
  }, [location.pathname]); // 경로가 변경될 때마다 role 업데이트

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="navigation fixed bottom-0 w-full bg-white shadow-lg flex justify-around py-2">
      <NavLink to="/classroom" className={({ isActive }) => isActive ? 'flex flex-col items-center text-pink2' : 'flex flex-col items-center text-gray-600'}>
        <BuildingLibraryIcon className="h-6 w-6" />
        <span className="text-xxs">내 강의실</span>
      </NavLink>
      
      {selectedRole === "mentor" ? (
        <NavLink to="/register" className={({ isActive }) => isActive ? 'flex flex-col items-center text-pink2' : 'flex flex-col items-center text-gray-600'}>
          <CloudIcon className="h-6 w-6" />
          <span className="text-xxs">등록하기</span>
        </NavLink>
      ) : (
        <NavLink to="/matchingscreen" className={({ isActive }) => isActive ? 'flex flex-col items-center text-pink2' : 'flex flex-col items-center text-gray-600'}>
          <CloudIcon className="h-6 w-6" />
          <span className="text-xxs">매칭하기</span>
        </NavLink>
      )}

      <NavLink to="/home" className={({ isActive }) => isActive ? 'flex flex-col items-center text-pink2' : 'flex flex-col items-center text-gray-600'}>
        <HomeIcon className="h-6 w-6" />
        <span className="text-xxs">Home</span>
      </NavLink>

      <NavLink to="/evaluation" className={`flex flex-col items-center ${isActive ? 'text-pink2' : 'text-gray-600'}`}>
        <HandThumbUpIcon className="h-6 w-6" />
        <span className="text-xxs">평가하기</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => isActive ? 'flex flex-col items-center text-pink2' : 'flex flex-col items-center text-gray-600'}>
        <UserIcon className="h-6 w-6" />
        <span className="text-xxs">프로필</span>
      </NavLink>
    </div>
  );
};

export default Navigation;
