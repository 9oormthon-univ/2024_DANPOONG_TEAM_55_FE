import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPink from "../components/ButtonPink";

function Register() {
  const [mentoringName, setMentoringName] = useState("");
  const [mentoringDescription, setMentoringDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mentoringName || !mentoringDescription) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const mentoringData = {
      mentoringName,
      mentoringDescription,
    };

    console.log("멘토링 등록 정보:", mentoringData);

    alert("멘토링이 등록되었습니다!");
    navigate("/classroom");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white">
      <h2 className="font-semibold mt-12 mb-4 text-black">등록하기</h2>
      <p className="mb-8 text-gray-500 text-xs">구름대학교에 멘토링을 등록해주세요!</p>
      <div className="w-full border-b border-gray2 mb-4"></div>
      <p className="mb-2 text-black text-sm">멘티에게 어떤 멘토링인지 알려주세요!</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {/* 멘토링명 */}
        <div className="mb-2">
          <label htmlFor="mentoringName" className="block text-sm text-gray-600">
          </label>
          <input
            type="text"
            id="mentoringName"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={mentoringName}
            onChange={(e) => setMentoringName(e.target.value)}
            placeholder="멘토링 명을 입력해주세요"
            required
          />
        </div>

        {/* 멘토링 소개 */}
        <div className="mb-4">
          <label htmlFor="mentoringDescription" className="block text-sm text-gray-600">
          </label>
          <textarea
            id="mentoringDescription"
            className="w-full h-60 p-3 border border-gray-300 rounded-lg"
            rows="4"
            value={mentoringDescription}
            onChange={(e) => setMentoringDescription(e.target.value)}
            placeholder="멘토링 소개를 입력해주세요 (100자 내외)"
            required
          />
        </div>

        {/* 등록 버튼 */}
        <div className="w-full">
          <ButtonPink type="submit">등록</ButtonPink>
        </div>
      </form>
    </div>
  );
}

export default Register;
