"use server";
import axios from 'axios';

const axioInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

axioInstance.interceptors.request.use((config) => {
    return config;
});

axioInstance.interceptors.response.use((response) => {
    // do something
    return response;
}); 

export default axioInstance;