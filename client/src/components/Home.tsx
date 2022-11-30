import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('JWT')) navigate('/games');
  }, []);
  return (
    <Box
      style={{
        background: 'goldenrod',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm />
    </Box>
  );
}
