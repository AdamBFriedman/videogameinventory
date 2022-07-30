import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('JWT', '');
    navigate('/');
  };
  return (
    <Button variant="contained" onClick={handleLogout}>
      <Typography variant="h6" component="h6">
        Logout
      </Typography>
    </Button>
  );
};
