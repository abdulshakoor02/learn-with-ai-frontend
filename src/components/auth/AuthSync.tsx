'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { storeAuthData, clearAuthData } from '@/lib/localStorage';

/**
 * AuthSync Component - Synchronizes NextAuth session with localStorage
 * This component should be placed in the root layout or app wrapper
 */
export default function AuthSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      // Store authentication data in localStorage
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
    } else if (status === 'unauthenticated') {
      // Clear authentication data from localStorage
      clearAuthData();
    }
  }, [session, status]);

  return null; // This component doesn't render anything
}
