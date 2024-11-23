// questionApi.js
import axios from 'axios';

const apiUrl = 'http://58.238.255.245:8080';
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss";

// VARKI 테스트 리셋 API 
export const resetVarkiTest = async () => {
  const endpoint = '/api/v1/users'; // API 엔드포인트

  try {
    const response = await axios.delete(apiUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    return response.data; // 실제 응답 데이터 반환
  } catch (error) {
    throw error.response?.data?.message || '서버 오류가 발생했습니다.';
  }
};

export const fetchNextQuestion = async () => {
  const endpoint = '/api/v1/questions/next';

  try {
    const response = await axios.get(apiUrl + endpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || '서버 오류가 발생했습니다.';
  }
};

export const submitAnswer = async (questionId, answerId) => {
    const endpoint = `/api/v1/questions/${questionId}?answerId=${answerId}`;

    try {
      const response = await axios.post(apiUrl + endpoint, {}, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || '서버 오류가 발생했습니다.';
    }
};
