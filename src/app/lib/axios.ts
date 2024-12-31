import axios from 'axios';

const axioInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

axioInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axioInstance.interceptors.response.use((response) => {
    // do something
    return response;
}); 

export default axioInstance;