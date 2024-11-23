import axios from 'axios';

const API_PROXY_SERVER = "58.238.255.245:8080";

export const axiosWithoutAuth = axios.create(
    {
        baseURL: `http://${API_PROXY_SERVER}/api/v1`,
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export const axiosWithAccessToken = (accessToken) => axios.create({
    baseURL: `http://${API_PROXY_SERVER}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
});

// multipart를 content-type으로 하는 axios 인스턴스
export const axiosWithMultipartContentType = (accessToken) => axios.create({
    baseURL: `http://${API_PROXY_SERVER}/api/v1`,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
    }
});