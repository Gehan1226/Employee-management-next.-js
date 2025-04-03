"use server";
import axios from "axios";
import { cookies } from "next/headers";

const axioInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axioInstance.interceptors.request.use(async (config) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axioInstance.interceptors.response.use((response) => {
  // do something
  return response;
});

export default axioInstance;
