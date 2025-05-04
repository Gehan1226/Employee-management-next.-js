import axios from "axios";

const axioInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axioInstance.interceptors.request.use(async (config) => {
  return config;
});

axioInstance.interceptors.response.use((response) => {
  
  console.log("Response:", response);
  return response;
});

export default axioInstance;
