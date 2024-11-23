import {axiosWithAccessToken} from "./AxiosInstance";

export const getEvaluationByMentorId = async (token, mentorId) => {
    try{
        const response = await axiosWithAccessToken(token).get('/evaluations?mentorId=' + mentorId);
        return response.data;
    } catch (error) {
        console.error('평가 화면에 필요한 정보를 가져오는데 실패했습니다', error);
    }
}