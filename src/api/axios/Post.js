import {axiosWithAccessToken} from "./AxiosInstance";

export const sendAnswerQuestion = async (token, questionId, answerId) => {
    try{
        const response = await axiosWithAccessToken(token).post(`/questions/${questionId}?answerId=${answerId}`);
        return response.status;
    } catch (error) {
        console.error('답변을 제출하는데 실패했습니다', error);
    }
}

export const getNextQuestion = async (token) => {
    try{
        const response = await axiosWithAccessToken(token).get('/questions/next');
        return response.data;
    } catch (error) {
        console.error('다음 질문을 가져오는데 실패했습니다', error);
    }
}