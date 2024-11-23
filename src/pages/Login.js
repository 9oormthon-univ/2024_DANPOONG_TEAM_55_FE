import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKakaoAuthUrl, getAccessTokenFromCookies, fetchNickname } from '../api/loginApi';
import SuccessModal from '../components/SuccessModal';

function Login() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [nickname, setNickname] = useState(''); // 닉네임 상태

  const KAKAO_AUTH_URL = getKakaoAuthUrl();

  const handleKakaoLogin = (event) => {
    event.preventDefault(); // 기본 동작 방지
    window.location.href = KAKAO_AUTH_URL; // 카카오 로그인 URL로 리다이렉트
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromCookies('access_token');
    console.log('Access Token:', accessToken);
  
    if (accessToken) {
      fetchNickname(accessToken)
        .then((nick) => {
          console.log('Fetched Nickname:', nick);
          setNickname(nick);
          setIsModalOpen(true);
        })
        .catch((error) => {
          console.error('Failed to fetch nickname:', error);
        });
    } else {
      console.warn('No access token found in cookies.');
    }
  }, []);
  

  const handleCloseModal = () => {
    console.log('Closing modal...');
    setIsModalOpen(false);
    navigate('/roleselection'); // 모달 닫힌 후 역할 선택 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white text-black">
      <img src="/logo.svg" style={{ width: '200px', height: '200px' }} className="mt-12 mb-16" alt="Logo" />
      <h1 className="text-lg font-semibold mb-4 w-full text-left">환영해요!</h1>
      <p className="text-xs font-semibold mb-4 w-full text-left">
        간편하게 로그인하고 다양한 서비스를 이용해보세요!
      </p>

      <a
        href="#"
        onClick={handleKakaoLogin}
        className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg"
      >
        <img src="/kakao_login_large_wide.png" alt="KaKao Login" className="h-11" />
      </a>

      <div className="w-full border-b border-gray2 mt-4"></div>

      {/* SuccessModal */}
      {isModalOpen && (
        <SuccessModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="로그인 성공!"
          message={`${nickname}님, 환영합니다!`}
        />
      )}
    </div>
  );
}

export default Login;
