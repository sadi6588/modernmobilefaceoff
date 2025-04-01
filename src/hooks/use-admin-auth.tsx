
import { useState, useEffect } from 'react';
import { Admin, AdminPermissions } from '@/data/phonesData';

interface AdminSession {
  username: string;
  authenticated: boolean;
  timestamp: number;
  id: string;
}

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<AdminPermissions>({
    addPhone: false,
    deletePhone: false,
    editPhone: false,
    viewAdmins: false,
    manageAdmins: false
  });

  // Session timeout in milliseconds (30 minutes)
  const SESSION_TIMEOUT = 30 * 60 * 1000;

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = () => {
    setIsLoading(true);
    try {
      const sessionData = localStorage.getItem('adminSession');
      
      if (!sessionData) {
        setAdmin(null);
        setIsLoading(false);
        return;
      }
      
      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();
      
      if (!session.authenticated || (now - session.timestamp > SESSION_TIMEOUT)) {
        // Session expired
        localStorage.removeItem('adminSession');
        setAdmin(null);
        setIsLoading(false);
        return;
      }
      
      // For demo, we'll create a mock admin
      const mockAdmin: Admin = {
        id: session.id || 'admin1',
        username: session.username,
        passwordHash: '',
        otpSecret: '',
        permissions: {
          addPhone: true,
          deletePhone: true,
          editPhone: true,
          viewAdmins: true,
          manageAdmins: true
        }
      };
      
      setAdmin(mockAdmin);
      setPermissions(mockAdmin.permissions);
      
      // Update session timestamp
      localStorage.setItem('adminSession', JSON.stringify({
        ...session,
        timestamp: now
      }));
      
    } catch (error) {
      console.error('Error checking admin session:', error);
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('adminSession');
    setAdmin(null);
    setPermissions({
      addPhone: false,
      deletePhone: false,
      editPhone: false,
      viewAdmins: false,
      manageAdmins: false
    });
  };
  
  return {
    admin,
    isLoading,
    permissions,
    checkAdminSession,
    logout
  };
};
