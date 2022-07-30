import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  homeWrapper: {
    background: 'goldenrod',
    height: '100vh',
    // padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('JWT')) navigate('/games');
  }, []);
  return (
    <Box className={classes.homeWrapper}>
      <LoginForm />
    </Box>
  );
}
