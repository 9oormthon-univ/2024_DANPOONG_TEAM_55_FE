import axios from 'axios';

const apiUrl = 'http://58.238.255.245:8080';
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss";

export const fetchUserProfile = async () => {
  const endpoint = '/api/v1/users/me';

  try {
    const response = await axios.get(apiUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`, // ACCESS_TOKEN 추가
      },
    });
    return response.data;
  } catch (error) {
    throw '서버 오류가 발생했습니다.';
  }
};

export const updateUserProfile = async (profileData) => {
  const endpoint = '/api/v1/users/me';

  try {
    const response = await axios.put(apiUrl + endpoint, profileData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`, // ACCESS_TOKEN 추가
      },
    });
    return response.data;
  } catch (error) {
    throw '서버 오류가 발생했습니다.';
  }
};
