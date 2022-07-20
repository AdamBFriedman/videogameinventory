import React from 'react';
import Box from '@mui/material/Box';
import AddGameForm from './AddGameForm';
import LoginForm from './LoginForm';
import { GamesTable } from './gamesTable';

export default function Home() {
  return (
    <Box>
      <h1>Login</h1>
      <LoginForm />
    </Box>
  );
}
