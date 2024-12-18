'use client';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/features/auth/authSlice';

export default function LoginButton() {
  const {
    loginWithRedirect,
    logout: auth0Logout,
    isAuthenticated,
    user,
  } = useAuth0();
  const dispatch = useDispatch();

  return (
    <div>
      {isAuthenticated && user ? (
        <Chip
          onClick={() => {
            auth0Logout({ logoutParams: { returnTo: window.location.origin } });
            dispatch(logout()); // Limpia Redux
          }}
          avatar={<Avatar src={user.picture} alt={user.name} />}
          label={`Welcome, ${user.name}`}
          sx={{ backgroundColor: '#1e2d3c', color: '#ccccde' }}
        />
      ) : (
        <Chip
          onClick={() => loginWithRedirect()}
          avatar={<Avatar />}
          label="Log In"
          sx={{
            backgroundColor: '#1e2d3c',
            color: '#ccccde',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
}
