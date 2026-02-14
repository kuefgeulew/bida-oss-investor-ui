import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { DEMO_INVESTOR } from '@/app/devtools/demoInvestorSeed';

// Mock User type (no backend)
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'investor' | 'officer' | 'admin' | 'superadmin';
  companyName?: string;
  investorId?: string; // Added for demo investor
  bbid?: string; // Added for demo investor
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void; // ⚡ EXPOSE FOR INSTANT DEMO INJECTION
  fastLogout: () => void; // ⚡ TRUE INSTANT LOGOUT (NO RELOAD)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage (MOCK DATA ONLY)
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call with timeout (NO BACKEND - MOCK DATA)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if this is the demo investor
      let mockUser: User;
      
      if (email === DEMO_INVESTOR.email) {
        // Demo investor with pre-seeded data
        const bbidEngine = await import('@/app/bbid/bbidEngine');
        const bbidRecords = bbidEngine.searchBBID({ investorId: DEMO_INVESTOR.investorId });
        const bbidRecord = bbidRecords.length > 0 ? bbidRecords[0] : null;
        
        // 🔴 CRITICAL: Demo must fail if engine doesn't have data
        // No phantom BBID allowed - engine is source of truth
        if (!bbidRecord?.bbid) {
          throw new Error(
            '🚨 Demo investor BBID not found in engine. ' +
            'Seed failed or was not run. ' +
            'This is a development-only feature - ensure seedDemoInvestor() executed successfully.'
          );
        }
        
        mockUser = {
          id: DEMO_INVESTOR.investorId,
          email: DEMO_INVESTOR.email,
          name: DEMO_INVESTOR.name,
          phone: '+880-1700-123456',
          role: 'investor',
          companyName: DEMO_INVESTOR.name,
          investorId: DEMO_INVESTOR.investorId,
          bbid: bbidRecord.bbid // ✅ From engine only - no fallback
        };
        
        toast.success(`Welcome back, ${DEMO_INVESTOR.name}! 🎯`, {
          description: 'Your profile is fully configured with completed approvals'
        });
      } else {
        // Regular mock user
        mockUser = {
          id: `mock-${Date.now()}`,
          email,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          phone: '+880-123-456-7890',
          role: email.includes('superadmin') ? 'superadmin' : email.includes('admin') ? 'admin' : email.includes('officer') ? 'officer' : 'investor',
          companyName: 'Investment Corp'
        };
        
        toast.success('Login successful!');
      }
      
      const mockToken = `mock-token-${Date.now()}`;

      // Store in state
      setUser(mockUser);
      setToken(mockToken);

      // Store in localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }) => {
    try {
      setIsLoading(true);
      
      // Simulate API call with timeout (NO BACKEND - MOCK DATA)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock new user
      const mockUser: User = {
        id: `mock-${Date.now()}`,
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: 'investor',
        companyName: 'New Investment Corp'
      };
      
      const mockToken = `mock-token-${Date.now()}`;

      // Store in state
      setUser(mockUser);
      setToken(mockToken);

      // Store in localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fastLogout = () => {
    // ⚡ TRUE INSTANT LOGOUT - Pure React state mutation
    // NO reload, NO redirect, NO delay
    // React instantly re-renders to login screen (0ms)
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clean up storage for next session
    sessionStorage.clear();
  };

  const logout = async () => {
    // ⚡ Just call fastLogout directly - no imports needed
    fastLogout();
  };

  const refreshUser = async () => {
    // Mock refresh - just reload from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    setUser, // ⚡ EXPOSED: Direct state mutation for demo injection
    fastLogout // ⚡ TRUE INSTANT: Pure React state clear (0ms)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};