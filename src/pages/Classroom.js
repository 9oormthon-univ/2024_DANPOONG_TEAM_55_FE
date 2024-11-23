import React, { useState, useEffect } from 'react';
import UserItem from '../components/UserItem';
import ButtonPink from '../components/ButtonPink';
import Empty from '../assets/empty.png';
import { useNavigate } from 'react-router-dom';
import { getMatchedMentor } from '../api/axios/Match';

function Classroom() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss";

  useEffect(() => {
    const fetchMatchedMentors = async () => {
      if (!token) {
        console.error('No token available');
        navigate('/login');
        return;
      }

      try {
        const data = await getMatchedMentor(token);

        if (data && Array.isArray(data.contents)) {
          // 중복된 id를 제거한 배열을 생성
          const uniqueUsers = [
            ...new Map(data.contents.map((user) => [user.id, user])).values()
          ];
  
          setFilteredUsers(uniqueUsers); // 중복이 제거된 배열을 상태에 저장
        } else {
          console.error('Expected array but got:', data);
          setFilteredUsers([]); // 오류 발생 시 빈 배열로 설정
        }
      } catch (error) {
        console.error('Failed to fetch matched mentors:', error);
        setFilteredUsers([]); // 오류 발생 시 빈 배열로 설정
      }
    };
  
    fetchMatchedMentors();
  }, [token, navigate]);
  
  const handleButtonClick = (user) => {
    navigate(`/profile/${user.id}`, { state: { user } });
  };

  const handleHomeButtonClick = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-lg font-semibold mb-4 text-black">누구의 프로필을 확인할까요?</h1>
      <p className="mb-8 text-gray-500 text-xs">멘토링을 통해 새로운 인연을 만나봐요!</p>
      <div className="w-full border-b mb-4 border-gray2"></div>
      
      {filteredUsers.length === 0 ? (
        <div className='flex flex-col items-center justify-center'>
          <img src={Empty} alt="멘토링 목록이 없음" className="w-32 mt-4 mb-6" />
          <p className="text-black font-semibold">멘토링 목록이 없어요 :(</p>
          <ButtonPink onClick={handleHomeButtonClick}>
            홈 화면으로 이동
          </ButtonPink>
        </div>
      ) : (
        <ul className="w-full space-y-2">
          {filteredUsers.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              showButton={false}
              onButtonClick={handleButtonClick} 
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Classroom;
