import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isPrivateMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isPrivateMode = import.meta.env.VITE_IS_PRIVATE === 'true';

  useEffect(() => {
    // In private mode, auto-login as Kennon
    if (isPrivateMode) {
      const kennonUser: User = {
        id: 'kennon-admin',
        name: 'Kennon',
        email: 'kennon@kennonkart.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        plan: 'enterprise',
        createdAt: new Date(),
        connectedPlatforms: [
          { platform: 'medium', connected: true, username: 'kennon' },
          { platform: 'pinterest', connected: true, username: 'kennonkart' },
          { platform: 'reddit', connected: true, username: 'kennon_creator' },
          { platform: 'linkedin', connected: true, username: 'kennon-entrepreneur' },
        ],
      };
      
      setUser(kennonUser);
    }
    
    setLoading(false);
  }, [isPrivateMode]);

  return (
    <AuthContext.Provider value={{ user, loading, isPrivateMode }}>
      {children}
    </AuthContext.Provider>
  );
};