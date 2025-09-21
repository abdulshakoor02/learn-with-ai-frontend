'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getAuthData, clearAuthData, storeAuthData } from '@/lib/localStorage';

export function useAuthData() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      // Sync NextAuth session to localStorage
      const accessToken = (session as any).accessToken;
      const user = session.user;
      
      if (accessToken && user) {
        storeAuthData(accessToken, {
          id: user.id as string,
          email: user.email as string,
          name: user.name as string,
          mobile: (user as any).mobile,
        });
      }
      setIsLoading(false);
    } else if (status === 'unauthenticated') {
      // Clear localStorage when not authenticated
      clearAuthData();
      setIsLoading(false);
    }
  }, [session, status]);

  const getStoredAuthData = () => {
    if (typeof window !== 'undefined') {
      return getAuthData();
    }
    return { token: null, user: null };
  };

  return {
    isLoading,
    status,
    session,
    getStoredAuthData,
    clearAuthData,
  };
}
