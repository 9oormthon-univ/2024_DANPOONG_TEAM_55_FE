import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ButtonPink from "../components/ButtonPink";
import { updateUserRole } from '../api/roleApi';
import { fetchNickname } from '../api/userApi';
import { getAccessTokenFromCookies } from '../api/loginApi';

function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNicknameAsync = async () => {
      const accessToken = getAccessTokenFromCookies('access_token'); // 쿠키에서 토큰 가져오기
      if (!accessToken) {
        console.warn('액세스 토큰이 없습니다. 테스트 토큰을 사용합니다.');
      }

      try {
        const fetchedNickname = await fetchNickname(accessToken); // 닉네임 가져오기
        setNickname(fetchedNickname);
      } catch (error) {
        console.error('닉네임을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchNicknameAsync();
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleConfirm = async () => {
    if (selectedRole) {
      try {
        const updatedRole = await updateUserRole(selectedRole); // 역할 업데이트
        localStorage.setItem('role', selectedRole); // 선택한 역할을 localStorage에 저장

        // 쿠키에 역할 저장
        document.cookie = `role=${selectedRole}; path=/;`;

        alert(`${nickname || '사용자'}님! ${selectedRole === "mentor" ? "멘토" : "멘티"} 역할을 선택했습니다.`);
        navigate('/profile'); // 프로필 페이지로 이동
      } catch (error) {
        console.error('역할 선택에 실패했습니다:', error);
        alert('역할 선택에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert("역할을 선택해주세요.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white">
      <div className="w-full border-b border-gray2"></div>
      <h2 className="font-semibold mt-12 mb-2 text-black">활동할 역할을 선택하세요!</h2>
      <p className="text-xs mb-12">역할은 나중에 바꿀 수 없으니 신중하게 골라주세요</p>
      <div className="flex gap-3">

        {/* 멘토 */}
        <div
          className={`rounded-lg overflow-hidden w-40 ${
            selectedRole === "mentor" ? "bg-yellow" : "bg-gray2"
          }`}
          onClick={() => handleRoleSelect("mentor")}
        >
          <div className="relative">
            <img
              className="w-full h-28 object-cover"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Mentor"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm text-black font-semibold">멘토</h3>
            <p className="text-gray-600 text-xs">멘티를 대상으로<br />멘토링을 진행해요</p>
          </div>
        </div>

        {/* 멘티 */}
        <div
          className={`rounded-lg overflow-hidden w-40 ${
            selectedRole === "mentee" ? "bg-yellow" : "bg-gray2"
          }`}
          onClick={() => handleRoleSelect("mentee")}
        >
          <div className="relative">
            <img
              className="w-full h-28 object-cover"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Mentee"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm text-black font-semibold">멘티</h3>
            <p className="text-gray-600 text-xs">멘토로부터<br />배우며 성장해요</p>
          </div>
        </div>

      </div>

      {/* 역할 선택 완료 버튼 */}
      <div className="w-full fixed bottom-10 px-6">
        <ButtonPink onClick={handleConfirm}>
          선택 완료
        </ButtonPink>
      </div>
    </div>
  );
}

export default RoleSelection;
