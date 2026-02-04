// API Service - Centralized API communication
const API_BASE_URL = 'http://127.0.0.1:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async createUser(name: string, email: string, password: string, role: string) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  }

  async getUsersByRole(role: string) {
    return this.request(`/users/${role}`, {
      method: 'GET',
    });
  }

  async getUserById(id: string) {
    return this.request(`/user/${id}`, {
      method: 'GET',
    });
  }

  // Tracking endpoints
  async trackLocation(traineeId: string, latitude: number, longitude: number) {
    return this.request('/track-location', {
      method: 'POST',
      body: JSON.stringify({
        trainee_id: traineeId,
        latitude,
        longitude,
        synced: true,
      }),
    });
  }

  async syncData(logs: any[]) {
    return this.request('/sync-data', {
      method: 'POST',
      body: JSON.stringify({ logs }),
    });
  }

  // Session endpoints
  async createSession(sessionData: any) {
    return this.request('/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getSessions() {
    return this.request('/sessions', {
      method: 'GET',
    });
  }

  async getSessionById(id: string) {
    return this.request(`/session/${id}`, {
      method: 'GET',
    });
  }

  async updateSession(id: string, data: any) {
    return this.request(`/session/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
