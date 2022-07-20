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
    <Box>
      <h1>Login</h1>
      <LoginForm />
    </Box>
  );
}
