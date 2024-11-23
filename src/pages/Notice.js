import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Notice() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const newNotificationsCount = notifications.filter(notification => notification.isNew).length;

  useEffect(() => {
    fetch('/api/notifications.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => {
        console.error('Failed to fetch notifications:', error);
      });
  }, []);

  const handleNotificationClick = (notification) => {
    if (notification.type === '수락') {
      // 멘토링 페이지로 이동
      navigate('/mentoring');
    } else if (notification.type === '신청') {
      // 신청한 멘티의 프로필로 이동
      navigate(`/profile/${notification.userId}`); // 유저 ID를 포함하여 프로필로 이동
    } else if (notification.type === '당도 평가') {
      // 프로필로 이동
      navigate(`/profile`); 
    }

    // 알림 읽음 처리
    setNotifications(prevNotifications => 
      prevNotifications.map(n => 
        n.id === notification.id ? { ...n, isNew: false } : n
      )
    );
  };

  // 알림 목록 렌더링 함수
  const renderNotifications = () => {
    return (
      <ul className="space-y-4 text-sm">
        {notifications.map(notification => (
          <li 
            key={notification.id} 
            className={`relative p-3 rounded-md ${notification.isNew ? 'bg-yellow' : 'border'}`}
            onClick={() => handleNotificationClick(notification)}
          >
            {notification.isNew && (
              <span className="absolute -top-3 -left-0 h-2 w-2 bg-pink rounded-full"></span>
            )}
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col justify-center h-full p-4">
      <h1 className="text-lg text-black font-semibold mb-4">알림</h1>
      <div className="w-full max-w-md">
        {newNotificationsCount > 0 ? (
          <p className='mb-4 text-sm'>새 알림 {newNotificationsCount}개</p>
        ) : (
          <p className='mb-4 text-sm'>새 알림이 없습니다.</p>
        )}
        <div className="w-full border-b mb-8 border-gray2"></div>
        {renderNotifications()}
      </div>
    </div>
  );
}

export default Notice;
