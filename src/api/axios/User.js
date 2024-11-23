import {axiosWithAccessToken} from "./AxiosInstance";

export const addUserInfo = async (token, university, additionalInfo, tags) => {
    try {
        const requestData = {
            university,
            additionalInfo,
            tags
        };

        const response = await axiosWithAccessToken(token).patch('/users', requestData);
        return response.status;
    } catch (error) {
        console.error('유저의 추가 정보를 입력하는데 실패했습니다', error);
    }
};

export const getUserInfo = async (token) => {
    try {
        const response = await axiosWithAccessToken(token).get('/users/me');
        return response.data;
    } catch (error) {
        console.error('유저의 정보를 가져오는데 실패했습니다', error);
    }
}

export const getMentorsByVarki = async (token) => {
    try {
        const response = await axiosWithAccessToken(token).get('/users/mentors');
        return response.data;
    } catch (error) {
        console.error('멘토 목록을 가져오는데 실패했습니다', error);
    }
}

export const getMyNickname = async (token) => {
    try {
        const response = await axiosWithAccessToken(token).get('/users/nickname');
        return response.data;
    } catch (error) {
        console.error('닉네임을 가져오는데 실패했습니다', error);
    }
}

export const selectUserRole = async (token, role) => {
    try {
        const response = await axiosWithAccessToken(token).patch('/users/role?role=' + role.toUpperCase());
        return response.data;
    } catch (error) {
        console.error('유저의 역할을 선택하는데 실패했습니다', error);
    }
}