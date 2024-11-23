import React from 'react';
import ClassImg from '../assets/empty.png';

function ClassroomItem({ name, keywords, mentorName }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden w-64">
      <div className="relative">
        <img 
          src={ClassImg}
          alt={name} 
          className="w-full h-28 object-cover" 
        />
      </div>
      <div className="p-4">
        <h2 className="text-sm font-semibold">{name}</h2>
        <div className="mt-2 flex flex-wrap gap-1">
          {keywords && keywords.length > 0 ? (
            keywords.map((keyword, index) => (
              <span key={index} className="bg-gray2 text-black text-xxs px-1 py-1">
                {keyword.label}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No keywords available</span>
          )}
        </div>
        <p className="text-xs mt-2 text-gray-500">{mentorName}</p>
      </div>
    </div>
  );
}

export default ClassroomItem;
