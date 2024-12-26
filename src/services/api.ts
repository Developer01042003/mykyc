// src/services/api.ts
import axios from 'axios';
import { SignUpData, LoginData, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (config.url?.includes('/auth/login/') || config.url?.includes('/auth/signup/')) {
    return config;
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  signup: async (data: SignUpData) => {
    const response = await api.post<AuthResponse>('/auth/signup/', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post<AuthResponse>('/auth/login/', data);
    return response.data;
  },

  getSessionId: async () => {
    const response = await api.post<{ sessionId: string }>('/kyc/create-session/');
    return response.data;
  },

  verifyLiveness: async (sessionId: string) => {
    const response = await api.post<{ verified: boolean }>('/kyc/session-result/', { sessionId });
    return response.data;
  }
};