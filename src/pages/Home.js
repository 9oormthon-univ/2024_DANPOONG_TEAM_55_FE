import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClassroomItem from '../components/ClassroomItem';
import { fetchRecentMentorings } from '../api/homeApi';

function HomePage() {
  const [recentMentorings, setRecentMentorings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const evaluations = [
    {
      id: 1,
      name: '차가운 구름',
      position: '멘티',
      keywords: ['과제를 잘해요', '응답이 빨라요', '친절해요', '커리큘럼을 완주 했어요'],
    },
    {
      id: 2,
      name: '행복한 구름',
      position: '멘토',
      keywords: ['불친절 해요', '영어를 잘해요'],
    },
  ];

  useEffect(() => { 
    const loadRecentMentorings = async () => {
      try {
        const data = await fetchRecentMentorings();
        setRecentMentorings(data); // API 응답에서 `contents`를 상태에 저장
      } catch (err) {
        console.error('Error fetching recent mentorings:', err);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadRecentMentorings();
  }, []);

  if (loading) {
    return <div className="text-center p-6">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4 p-6">
      {/* 모집 중인 멘토링 목록 */}
      <div className="flex items-center justify-between">
        <p className="text-black text-center">모집 중인 멘토링 목록</p>
        <Link to="/classroom" className="text-black text-xs border border-black p-1 rounded">
          더보기 &gt;
        </Link>
      </div>

      <div className="flex space-x-2 mt-4">
        {recentMentorings.map((mentoring) => (
          <ClassroomItem
            key={mentoring.id}
            name={mentoring.title} // API의 `title`
            keywords={mentoring.mentor.tags} // API의 `mentor.tags`
            mentorName={mentoring.mentor.nickname} // API의 `mentor.nickname`
          />
        ))}
      </div>

      {/* 당도 평가 섹션 */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-black text-center">당도 평가</p>
          <Link to="/evaluation" className="text-black text-xs border border-black p-1 rounded">
            더보기 &gt;
          </Link>
        </div>
        <div className="flex space-x-2 mt-4">
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="bg-gray2 p-3 rounded-lg flex flex-col w-1/2">
              <div className="flex items-center justify-start">
                <h3 className="font-semibold text-sm mr-2">{evaluation.name}</h3>
                <span className="text-xs">{evaluation.position}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {evaluation.keywords.map((keyword, index) => (
                  <span key={index} className="bg-pink2 text-white text-xxs rounded-full px-2 py-1">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
