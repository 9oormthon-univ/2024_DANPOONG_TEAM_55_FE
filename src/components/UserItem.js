import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserItem = ({ user, onEvaluate, showButton, onButtonClick }) => {
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${user.id}`);
  };

  return (
    <li
      className={`flex justify-between items-start p-3 rounded-lg bg-yellow relative w-full`}
      onClick={() => onEvaluate && onEvaluate(user)}
    >
      <div className="flex items-start space-x-4">
        <img src={user.image} alt={user.nickname} className="w-20 h-20 rounded-[40%]" />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold">{user.nickname}</h2> {/* nickname 사용 */}
            <span className="text-xs font-semibold">{user.role}</span> {/* role 사용 */}
          </div>
          <p className="text-xs text-gray-500 mt-1">{user.additionalInfo}</p> {/* additionalInfo 사용 */}
          <div className="flex space-x-1 mt-2">
            {user.tags.map((tag, index) => ( // tags 사용
              <span key={index} className="bg-white text-black px-1 py-1 border text-xxs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showButton ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick(user);
          }}
          className="absolute bottom-4 right-4 px-2 py-1 bg-pink text-white text-sm rounded-full"
        >
          평가
        </button>
      ) : (
        <button
          onClick={handleProfileClick}
          className="absolute bottom-4 right-4 px-2 py-1 bg-pink text-white text-xxs rounded-full"
        >
          프로필로 이동
        </button>
      )}
    </li>
  );
};

export default UserItem;
