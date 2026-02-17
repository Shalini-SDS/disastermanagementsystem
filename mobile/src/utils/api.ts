import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage?.getItem?.('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage?.removeItem?.('authToken');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data: any) => api.post('/auth/signup', data),
  login: (email: string, password: string, role: 'trainer' | 'trainee') =>
    api.post('/auth/login', { email, password, role }),
  logout: () => api.post('/auth/logout'),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
};

export const sessionAPI = {
  getSessions: (role: 'trainer' | 'trainee') =>
    api.get(`/sessions?role=${role}`),
  getSessionDetails: (sessionId: string) =>
    api.get(`/sessions/${sessionId}`),
  createSession: (data: any) => api.post('/sessions', data),
  updateSession: (sessionId: string, data: any) =>
    api.put(`/sessions/${sessionId}`, data),
};

export const trackingAPI = {
  submitLocation: (data: any) => api.post('/tracking/location', data),
  getLocations: (sessionId: string) =>
    api.get(`/tracking/locations?sessionId=${sessionId}`),
};

export const emergencyAPI = {
  triggerEmergency: (data: any) => api.post('/emergency/trigger', data),
  getEmergencies: (sessionId?: string) =>
    api.get(`/emergency/list${sessionId ? `?sessionId=${sessionId}` : ''}`),
};
