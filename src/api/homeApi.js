import axios from 'axios';

const apiUrl = 'http://58.238.255.245:8080';
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss";


export const fetchRecentMentorings = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/mentorings/home`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`, // 인증 토큰 추가
      },
    });
    return response.data.contents; // API 응답에서 `contents` 배열 반환
  } catch (error) {
    console.error('최근 멘토링 데이터를 가져오는 데 실패했습니다:', error);
    throw error;
  }
};
