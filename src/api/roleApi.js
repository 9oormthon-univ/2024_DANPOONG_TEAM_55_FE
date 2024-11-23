import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = 'http://58.238.255.245:8080'; // API URL 정의
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss"; // 테스트 토큰

export const updateUserRole = async (role) => {
  const token = Cookies.get('access_token') || ACCESS_TOKEN; // 쿠키에서 토큰 가져오기, 없으면 테스트 토큰 사용

  if (!token) {
    throw new Error('토큰이 없습니다. 다시 로그인하세요.');
  }

  try {
    const response = await axios.patch(
      `${apiUrl}/api/v1/users/role?role=${role.toUpperCase()}`, // 역할을 대문자로 변환
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '서버 오류가 발생했습니다.';
  }
};
