import {axiosWithAccessToken} from "./AxiosInstance";

export const applyMentoring = async (token, mentorId) => {
    try{
        const response = await axiosWithAccessToken(token).post('/matches?mentorId=' + mentorId);
        return response.status;
    } catch (error) {
        console.error('멘토링 신청에 실패했습니다.', error);
    }
};

export const getMatchedMentor = async (token) => {
    try{
        const response = await axiosWithAccessToken(token).get('/matches');
        return response.data;
    } catch (error) {
        console.error('매칭된 멘토를 가져오는데 실패했습니다.', error);
    }
}

export const approveMentoring = async (token, matchId) => {
    try{
        const response = await axiosWithAccessToken(token).patch(`/matches/${matchId}/approve`);
        return response.status;
    } catch (error) {
        console.error('멘토링 승인에 실패했습니다.', error);
    }
}

export const rejectMentoring = async (token, matchId) => {
    try{
        const response = await axiosWithAccessToken(token).patch(`/matches/${matchId}/reject`);
        return response.status;
    } catch (error) {
        console.error('멘토링 거절에 실패했습니다.', error);
    }
}