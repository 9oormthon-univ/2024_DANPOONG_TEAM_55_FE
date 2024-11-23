import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserItem from '../components/UserItem';
import ButtonPink from '../components/ButtonPink';
import SuccessModal from '../components/SuccessModal';
import PraiseButton from '../components/PraiseButton';
import { getEvaluationByMentorId } from '../api/axios/Evaluation'; 

function Evaluate() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPraise, setSelectedPraise] = useState([]);
  const [tagItems, setTagItems] = useState({ good: [], bad: [] });
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/evaluation'); 
  };

  const handlePraiseClick = (praise) => {
    // 칭찬 버튼 클릭 시 선택된 칭찬 배열에 추가
    setSelectedPraise((prev) => 
      prev.includes(praise) ? prev.filter(item => item !== praise) : [...prev, praise]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchEvaluationData = async () => {
      
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTczMjM3MTk4MywiZXhwIjoxNzMyNzMxOTgzfQ.A68jdtzxWbRAAI3qwse6IagpCGFpoyQyMvKLZLvLEss";
      if (!user) {
        console.error('사용자 정보가 없습니다.');
        return;
      }

      try {
        const data = await getEvaluationByMentorId(token, user.id);
        if (data) {
          const goodTags = data.tag.contents.filter(tag => tag.tagType === 'GOOD');
          const badTags = data.tag.contents.filter(tag => tag.tagType === 'BAD');
          setTagItems({ good: goodTags, bad: badTags });
          setLoading(false);
        } else {
          setError('데이터를 불러오는 데 실패했습니다.');
          setLoading(false);
        }
      } catch (error) {
        console.error('평가 데이터 불러오기 실패:', error);
        setError('평가 데이터를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchEvaluationData();
  }, [user]);

  if (loading) {
    return <div>로딩 중...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 bg-white text-black">
      <button onClick={() => navigate('/evaluation')} className="flex justify-start w-full">
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-semibold mb-2">평가 화면</h1>
      <h3 className='text-xs mb-2'>남기고 싶은 칭찬을 선택해 주세요</h3>
      <UserItem
        user={user}
        onEvaluate={() => {}}
        isSelected={false}
        showButton={false}
      />
      <div className="w-full border-b mt-2 mb-2 border-gray2"></div>

      <div className="w-full space-y-3">
        <p className='text-xs text-black font-semibold'>어떤 부분이 좋았나요?</p>
        {tagItems.good.map((tag) => (
          <PraiseButton
            key={tag.id}
            label={tag.content} // 칭찬 내용
            onClick={() => handlePraiseClick(tag.content)}
            isSelected={selectedPraise.includes(tag.content)}
            isNegative={false}
          />
        ))}
        <p className='text-xs text-black font-semibold'>어떤 부분이 아쉬웠나요?</p>
        {tagItems.bad.map((tag) => (
          <PraiseButton
            key={tag.id}
            label={tag.content} // 칭찬 내용
            onClick={() => handlePraiseClick(tag.content)}
            isSelected={selectedPraise.includes(tag.content)}
            isNegative={true}
          />
        ))}
      </div>

      <div className="w-full mt-4">    
        <ButtonPink type="submit" onClick={handleSubmit}>
          완료
        </ButtonPink>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="당도 평가 완료!"
        message={`평가해 주셔서 감사합니다 :)`}
      />
    </div>
  );
}

export default Evaluate;
