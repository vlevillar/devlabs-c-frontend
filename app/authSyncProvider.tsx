'use client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/lib/features/auth/authSlice';

export function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(
        login({
          userId: user.sub || '',
          name: user.name || '',
          picture: user.picture || '',
        }),
      );

      localStorage.setItem('userId', user.sub || '');
      localStorage.setItem('userName', user.name || '');
      localStorage.setItem('userPicture', user.picture || '');
    } else {
      dispatch(logout());
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPicture');
    }
  }, [isAuthenticated, user, dispatch]);

  return <>{children}</>;
}
