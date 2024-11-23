import {axiosWithAccessToken} from "./AxiosInstance";

export const getMentoringTwo = async (token) => {
    try{
        const response = await axiosWithAccessToken(token).get('/mentorings/home');
        return response.data;
    } catch (error) {
        console.error('멘토링 목록을 가져오는데 실패했습니다', error);
    }
}