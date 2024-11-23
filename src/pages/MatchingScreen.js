import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MentorCard from '../components/MentorCard';
import Modal from '../components/Modal';
import SuccessModal from '../components/SuccessModal';
import { getMentorsByVarki } from '../api/axios/User';
import { applyMentoring } from '../api/axios/Match'; 

function MatchingScreen() {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss"; // 실제 토큰

  useEffect(() => {
    const fetchMentors = async () => {
      if (!token) {
        console.error('No token available');
        navigate('/login');
        return;
      }

      try {
        const data = await getMentorsByVarki(token);
        if (data && data.contents) {
          setMatchedUsers(data.contents);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      }
    };

    fetchMentors();
  }, [navigate]);

  const handleMatch = (mentor) => {
    setSelectedMentor(mentor);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedMentor(null);
  };

  const confirmMatch = async () => {
    if (!selectedMentor) {
      return;
    }

    try {
      const status = await applyMentoring(token, selectedMentor.id);
      if (status === 204) { 
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
      } else {
        console.error('멘토링 신청에 실패했습니다.');
      }
    } catch (error) {
      console.error('멘토링 신청 중 오류 발생:', error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white">
      <p className="mb-4 font-bold text-black text-lg text-center">당신의 멘토를 선택하세요!</p>
      <div className="w-full flex justify-end mb-2 mr-4">
        <Link to="/home" className="text-gray-500 text-xs">
          다음에 하기 &gt;
        </Link>
      </div>
      <div className="w-full space-y-2">
        {matchedUsers.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onMatch={handleMatch}
          />
        ))}
      </div>

      {/* 신청 확인 모달 */}
      <Modal
        isOpen={showConfirmationModal}
        onClose={closeConfirmationModal}
        onConfirm={confirmMatch}
        title="알림"
        message={`${selectedMentor?.nickname}님에게 멘티 신청을 하시겠습니까?`}
        cancel="아니오"
        confirm="예"
      />

      {/* 신청 완료 모달 */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        title="신청이 성공적으로 완료되었습니다!"
        message="멘토가 승인 후에 해당 멘토링의 멘티가 될 수 있어요! 멘토가 승인하면 알림을 보내드릴게요!"
      />
    </div>
  );
}

export default MatchingScreen;
