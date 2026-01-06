'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  initials: 'JS',
};

const STORAGE_KEY = 'mock-auth-user';

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Lazy initialization from localStorage
  const [user, setUser] = useState<User | null>(getStoredUser);

  const login = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
    setUser(MOCK_USER);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
