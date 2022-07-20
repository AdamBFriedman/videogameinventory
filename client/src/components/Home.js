import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  background: {
    background: 'red',
    height: '100vh',
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('JWT')) navigate('/games');
  }, []);
  return (
    <Box className={classes.background}>
      <h1>Login</h1>
      <LoginForm />
    </Box>
  );
}
