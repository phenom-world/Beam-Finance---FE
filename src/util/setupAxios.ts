import axios from 'axios';

import { handleErrorResponse } from './helper';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('auth');
    const token = user ? JSON.parse(user).accessToken : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          localStorage.removeItem('auth');
          window.location.href = '/login';
          break;
        default:
          handleErrorResponse(error);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
