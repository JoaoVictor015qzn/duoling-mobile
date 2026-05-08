import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from '../services/api';

type User = {
  id: number;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on app start
  useEffect(() => {
    const restore = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('@duoling:token');
        if (savedToken) {
          const userData = await apiRequest<User>('/auth/me', { token: savedToken });
          setToken(savedToken);
          setUser(userData);
        }
      } catch {
        await AsyncStorage.removeItem('@duoling:token');
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiRequest<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    await AsyncStorage.setItem('@duoling:token', data.access_token);
    setToken(data.access_token);

    const userData = await apiRequest<User>('/auth/me', { token: data.access_token });
    setUser(userData);
  };

  const register = async (name: string, email: string, password: string) => {
    await apiRequest('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });

    // Auto-login after register
    await login(email, password);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@duoling:token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
