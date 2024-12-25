import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    console.log('Request:', config);
    return config;
});

instance.interceptors.response.use((response) => {
    // do something
    return response;
}); 

export default instance;