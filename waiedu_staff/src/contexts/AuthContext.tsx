'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const token = authAPI.getToken();
      if (token && authAPI.isTokenValid()) {
        try {
          const profile = await authAPI.getProfile();
          setUser(profile);
        } catch (error) {
          console.error(error);
          authAPI.logout();
          router.push('/login');
        }
      } else {
        authAPI.logout();
      }
      setIsLoading(false);
    };

    validateSession();
  }, [router]);

  const login = (authData: any) => {
    authAPI.saveAuthData(authData);
    setUser(authData.user);
    router.push('/home');
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 