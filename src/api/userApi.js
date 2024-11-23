import axios from 'axios';

const apiUrl = 'http://58.238.255.245:8080';
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss";

export const fetchUserProfile = async (userId) => {
  const endpoint = userId ? `/api/v1/users/${userId}` : '/api/v1/users/me'; // userId가 있으면 해당 사용자 프로필, 없으면 본인 프로필
  
    try {
      const response = await axios.get(apiUrl + endpoint, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || '서버 오류가 발생했습니다.';
    }
  };

export const fetchNickname = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/users/nickname`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return response.data.nickName;
};

export const fetchUserRole = async () => {
  const response = await axios.get(`${apiUrl}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return response.data.role;
};
