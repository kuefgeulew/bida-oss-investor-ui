import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// API Base URL - change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add token to headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
  (response) => {
    // Return just the data
    return response.data;
  },
  (error: AxiosError) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // ⚡ Token expired or invalid - clear storage and reload to login
      // This runs outside React tree, so we can't use AuthContext
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
      return Promise.reject(new Error('Session expired'));
    }
    
    // Handle other errors
    const errorMessage = 
      (error.response?.data as any)?.message || 
      error.message || 
      'An unexpected error occurred';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;