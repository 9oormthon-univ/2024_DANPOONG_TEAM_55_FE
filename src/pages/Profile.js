import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RadarChart from '../components/RadarChart';
import ProfileBlock from '../components/ProfileBlock';
import { fetchUserProfile } from '../api/userApi';
import { resetVarkiTest } from '../api/questionApi'; // 실제 API 사용

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const profileData = await fetchUserProfile(userId);
      setProfile(profileData);
    } catch (error) {
      setError(error.message || '프로필 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleResetVarkiTest = async () => {
    try {
      const response = await resetVarkiTest();
      alert("VARKI 테스트 데이터가 초기화되었습니다."); // 성공 메시지
      navigate('/varkitest'); // 테스트 페이지로 리디렉션
    } catch (error) {
      alert('VARKI 테스트 초기화에 실패했습니다.');
      console.error(error);
    }
  };

  if (loading) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div>{error}</div>; // 에러 메시지 표시
  }

  if (!profile) {
    return <div>프로필 정보를 찾을 수 없습니다.</div>;
  }

  const { nickname, role, university, additionalInfo, tags, sugar, varki } = profile;

  return (
    <div className="profile-screen p-4">
      {/* 프로필 */}
      <ProfileBlock 
        nickname={nickname}
        role={role}
        university={university}
        additionalInfo={additionalInfo}
        tags={tags}
      />

      {/* 나의 당도 */}
      <div className="my-percentage mt-4 text-sm border-t border-b border-gray2 py-2">
<h3 className="text-base font-bold text-center text-black">{userId ? `${nickname}` : '나'}의 당도</h3>
        <p className="text-xs font-semibold text-center mt-2 text-gray-500">{sugar}/100%</p>
      </div>
      <div className="w-full bg-gray2 rounded-full h-2 mt-2">
        <div
          className="bg-pink h-2 rounded-full"
          style={{ width: `${sugar}%` }}
        ></div>
      </div>

      {/* VARKI 차트 */}
      <div className="flex justify-center items-center mt-8">
      <h3 className="text-base font-bold text-black">{userId ? `${nickname}` : '나'}의 VARKI 차트</h3>
      </div>
      <div className="chart-container mt-4 flex flex-col items-center justify-center">
        <RadarChart varki={varki} />
        <button
          className="mt-2 text-xs text-red-500 hover:underline"
          onClick={handleResetVarkiTest}
        >
          테스트 리셋하기
        </button>
      </div>
    </div>
  );
};

export default Profile;
