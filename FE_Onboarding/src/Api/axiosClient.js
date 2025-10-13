// src/Api/axiosClient.js
import axios from "axios";
import { handle401Error } from "../Global/hooks";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_ONBOARDING_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) handle401Error();
    return Promise.reject(error);
  }
);

export default axiosClient;
