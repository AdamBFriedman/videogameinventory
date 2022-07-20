import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('JWT', '');
    navigate('/');
  };
  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};
