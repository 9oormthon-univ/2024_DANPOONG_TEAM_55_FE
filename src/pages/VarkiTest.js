import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPink from "../components/ButtonPink";
import { fetchNextQuestion, submitAnswer } from '../api/questionApi';
import { fetchUserRole } from '../api/userApi';

function VarkiTest() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const fetchQuestion = async () => {
    try {
      const data = await fetchNextQuestion();
      setQuestionData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error(error);
    }
  };

  // const fetchUserRoleData = async () => {
  //   try {
  //     const userRole = await fetchUserRole();
  //     setRole(userRole);
  //   } catch (error) {
  //     alert('역할을 가져오는 데 실패했습니다.');
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchQuestion();
    //fetchUserRoleData();
  }, []);

  // 진행 상태 계산
  const progressPercentage = ((currentQuestionIndex + 1) / (questionData?.totalQuestions || 1)) * 100;

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer) {
      try {
        console.log('제출할 데이터:', {
          questionId: questionData.id,
          answerId: selectedAnswer.id 
        });
        await submitAnswer(questionData.id, selectedAnswer.id);
        setSelectedAnswer(null);
        
        await fetchQuestion();
        setCurrentQuestionIndex(prevIndex => prevIndex + 1); 
      } catch (error) {
        alert('답변 제출에 실패했습니다.');
        console.error(error);
      }
    } else {
      alert('답변을 선택해주세요.');
    }
  };

  // 마지막 질문인 경우 역할에 따라 페이지 이동
  useEffect(() => {
    if (questionData && currentQuestionIndex >= questionData.totalQuestions) {
      if (role === "mentor") {
        navigate('/classroom');
      } else {
        navigate('/matchingscreen');
      }
    }
  }, [currentQuestionIndex, navigate, role, questionData]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white">
      {/* 진행 상태 표시 */}
      <div className="w-full flex flex-col items-center mb-6 mt-6">
        <span className="text-lg text-black font-bold">{currentQuestionIndex + 1}/{questionData?.totalQuestions}</span>
        <div className="w-full bg-gray2 rounded-full h-2">
          <div
            className="bg-pink2 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full border-b border-gray2"></div>

      {questionData && (
        <>
          <p className="font-semibold text-black mt-4 mb-4">{questionData.title}</p>
          
          <div className="flex flex-col w-full gap-2 mb-6">
            {questionData.answers.map((answer) => (
              <button
                key={answer.id}
                className={`px-4 py-3 text-sm rounded-lg ${selectedAnswer === answer ? "bg-yellow" : "border"}`}
                onClick={() => handleAnswerSelect(answer)}
              >
                {answer.content}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-between gap-2 w-full fixed bottom-20 px-6">        
        <ButtonPink onClick={handleNextQuestion}>
          {currentQuestionIndex === (questionData?.totalQuestions - 1) ? '제출' : '다음'}
        </ButtonPink>
      </div>
    </div>
  );
}

export default VarkiTest;
