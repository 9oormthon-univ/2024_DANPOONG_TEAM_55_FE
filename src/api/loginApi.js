import axios from 'axios';

const apiUrl = 'http://58.238.255.245:8080';
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss";

const KAKAO_AUTH_URL = `${apiUrl}/login`;

export const fetchNickname = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/users/nickname`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 수정된 부분
      },
    });
    return response.data.nickName;
  } catch (error) {
    console.error('닉네임을 가져오는 데 실패했습니다:', error);
    throw error;
  }
};


export const getAccessTokenFromCookies = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const getKakaoAuthUrl = () => {
  return KAKAO_AUTH_URL;
};
