import React from 'react';

function MentorCard({ mentor, onMatch }) {
  if (!mentor || !mentor.tags || !Array.isArray(mentor.tags)) {
    return <div>멘토 정보가 없습니다</div>; // 데이터가 없을 경우 대체 렌더링
  }

  return (
    <div className="relative flex flex-col p-4 rounded-lg border-2 border-gray-500 mx-auto max-w-xs">
      <div>
        <h2 className="text-base text-black font-semibold">{mentor.nickname}</h2>
        <p className="text-xs text-gray-600">{mentor.additionalInfo}</p>
        <div className="flex space-x-2 mt-2">
          {mentor.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xxs bg-yellow rounded-full text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => onMatch(mentor)}
        className="absolute bottom-4 right-3 px-3 py-1 text-black border-2 border-gray-500 rounded-md text-xs hover:bg-gray-300"
      >
        신청
      </button>
    </div>
  );
}

export default MentorCard;
