import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, checkSupabaseConnection } from './supabase';

interface AuthUser {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      // Check localStorage for existing session
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Check if Supabase is connected
      await checkSupabaseConnection();

      setIsInitialized(true);
    };

    initAuth();

    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Handle Supabase auth if we implement it later
          console.log('Supabase auth state changed:', event, session);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('auth_user');
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));

    // Log activity in the database
    try {
      await supabase.from('auth_logs').insert({
        email: userData.email,
        action: 'login',
        ip_address: 'client',
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log authentication:', error);
    }
  };

  const logout = async () => {
    // Log activity before removing user
    if (user) {
      try {
        await supabase.from('auth_logs').insert({
          email: user.email,
          action: 'logout',
          ip_address: 'client',
          user_agent: navigator.userAgent
        });
      } catch (error) {
        console.error('Failed to log authentication:', error);
      }
    }

    setUser(null);
    localStorage.removeItem('auth_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isInitialized,
      login,
      logout
    }}>
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