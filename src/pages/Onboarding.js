import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import ButtonWhite from '../components/ButtonWhite';
import ButtonPink from '../components/ButtonPink';
import '../App.css';

function Onboarding() {
  const navigate = useNavigate();
  const sliderRef = useRef(null); // 슬라이더 참조 생성
  const [isLastSlide, setIsLastSlide] = useState(false); // 마지막 슬라이드 여부 상태 관리
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 번호

  const slides = [
    {
      id: 1,
      title: 'VARKI 모델 기반의 성향 분석으로 정교한 멘토 매칭',
      description: '나만의 학습 스타일에 딱 맞는 멘토와 연결해서 멘토링을 통해 학습 효율성을 높이고 자기주도 학습을 강화해요.',
      image: '/OnboardingImage1.png',
    },
    {
      id: 2,
      title: '매칭 알고리즘: VARKI 모델',
      description: '간단한 질문으로 학습 스타일 및 성향을 파악하고 VARKI 데이터를 바탕으로 가장 유사한 멘토를 추천해요.',
      image: '/OnboardingImage2.png',
    },
    {
      id: 3,
      title: '솜사탕 게이지',
      description: '신뢰도와 성과를 한눈에 확인할 수 있어요. 활동 횟수와 평가 점수에 따라 솜사탕 크기와 모양이 변화해요.',
      image: '/OnboardingImage3.png',
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => {
      setCurrentSlide(index); // 슬라이드 변경 시 현재 슬라이드 업데이트
      setIsLastSlide(index === slides.length - 1); // 마지막 슬라이드 여부 확인
    }
  };

  const handleNext = (isLast) => {
    if (isLast) {
      navigate('/login'); // 마지막 슬라이드에서 페이지 이동
    } else {
      sliderRef.current.slickNext(); // 다음 슬라이드로 이동
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 슬라이더 */}
      <Slider {...settings} ref={sliderRef} className="relative flex-grow">
        {slides.map((slide) => (
          <div key={slide.id} className="flex flex-col items-start justify-center h-full p-4 slide">
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* 내용 */}
      <div className="w-full px-6 mt-8 mb-6 ">
        <h3 className="text-black text-lg font-bold mb-4">{slides[currentSlide].title}</h3>
        <p className="text-xs text-gray-600">{slides[currentSlide].description}</p>
      </div>

      {/* 버튼 */}
      <div className="w-full px-6 mb-6 fixed bottom-0">
        {isLastSlide ? (
          <ButtonPink onClick={() => handleNext(true)}>
            시작하기
          </ButtonPink>
        ) : (
          <ButtonWhite onClick={() => handleNext(false)}>
            다음
          </ButtonWhite>
        )}
      </div>
    </div>
  );
}

export default Onboarding;