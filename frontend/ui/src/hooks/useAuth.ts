import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';

export interface User {
  user_id: string;
  email?: string;
  name?: string;
  role: 'trainer' | 'trainee';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.login(email, password);

      if (response.success && response.data) {
        const userData: User = {
          user_id: response.data.user_id,
          email,
          role: response.data.role,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData.user_id);

        return userData;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, role: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.signup(name, email, password, role);

      if (response.success && response.data) {
        const userData: User = {
          user_id: response.data.user_id,
          email,
          name,
          role: response.data.role,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userId', userData.user_id);

        return userData;
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await apiService.logout();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
}
