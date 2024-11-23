import React from 'react';

const ProfileBlock = ({ nickname, role, university, additionalInfo, tags }) => {
  return (
    <div className="profile-block bg-yellow rounded-lg p-4 w-full">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img src="/logo.svg" alt="Profile" className="w-20 h-20 rounded-[40%]" />
        </div>
        <div>
          <div className="flex items-center space-x-2 text-black">
            <h2 className="text-base font-semibold">{nickname}</h2>
            <span className="text-xs font-semibold">{role}</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            <p>{university}</p>
          </div>
          <div className="text-xs text-gray-500">
            <p>{additionalInfo}</p>
          </div>
        </div>
      </div>
      <div className="text-xxs font-semibold">
        <div className="flex space-x-1 justify-end">
          {tags.map((tag, index) => (
            <span key={index} className="bg-pink text-white px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBlock;
