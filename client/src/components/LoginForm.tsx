import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: '*/*',
});

export const getHeadersWithAuth = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('JWT')}`,
});

export const handleErrors = (res: any) => {
  if (!res.ok) {
    alert(`Error: ${res.statusText}`);
  }
  return res.json();
};

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginAsUser = async () => {
    const JWT = await fetch(
      'https://videogameinventory.herokuapp.com/auth',
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ user: username, pwd: password }),
      }
    ).then(handleErrors);

    localStorage.setItem('JWT', JWT.accessToken);

    setUsername('');
    setPassword('');

    navigate('/games');

    return JWT;
  };

  const handleLogin = async () => {
    try {
      loginAsUser().then((result) => console.log(result));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    alert('Register coming soon');
  };

  return (
    <Card
      style={{
        width: 'auto',
        minWidth: 500,
        maxWidth: 540,
        minHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box>
        <Typography variant="h6" component="h1" textAlign="center">
          <img style={{ width: 150 }} alt="Mega Man" src={Logo} />
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Box>
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
    </Card>
  );
}
